"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { db } from "@/lib/firebase/firebaseClient";
import { doc, getDoc, collection, getDocs, setDoc } from "firebase/firestore";
import {
  Product,
  Specification,
  UsageGuide,
  Dosage,
  Safety,
  VisualGuide,
  Review,
} from "@/types/product";
import Image from "next/image";
import Link from "next/link";
import {
  FaHeart,
  FaShoppingBasket,
  FaCertificate,
  FaShieldAlt,
  FaStar,
} from "react-icons/fa";

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.productId as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [specifications, setSpecifications] = useState<Specification[]>([]);
  const [usageGuide, setUsageGuide] = useState<UsageGuide[]>([]);
  const [dosage, setDosage] = useState<Dosage[]>([]);
  const [safety, setSafety] = useState<Safety[]>([]);
  const [visualGuide, setVisualGuide] = useState<VisualGuide[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedPrice, setSelectedPrice] = useState(0);
  const [selectedStock, setSelectedStock] = useState(0);
  const [selectedImage, setSelectedImage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("description");
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewForm, setReviewForm] = useState({
    userName: "",
    rating: 5,
    reviewText: "",
    wouldRecommend: true
  });

  useEffect(() => {
    const fetchProduct = async () => {
      const productDoc = await getDoc(doc(db, "products", productId));
      if (productDoc.exists()) {
        const productData = { id: productDoc.id, ...productDoc.data() } as Product;
        setProduct(productData);
        
        // Set default size selection
        if (productData.sizes && productData.sizes.length > 0) {
          const firstSize = productData.sizes[0];
          setSelectedSize(firstSize.size);
          setSelectedPrice(firstSize.price);
          setSelectedStock(firstSize.stockQuantity);
        } else {
          setSelectedPrice(productData.price);
          setSelectedStock(productData.stockQuantity);
        }
      }

      const specsSnap = await getDocs(
        collection(db, "products", productId, "specifications")
      );
      setSpecifications(
        specsSnap.docs.map((d) => ({ id: d.id, ...d.data() } as Specification))
      );

      const usageSnap = await getDocs(
        collection(db, "products", productId, "usageGuide")
      );
      setUsageGuide(
        usageSnap.docs
          .map((d) => ({ id: d.id, ...d.data() } as UsageGuide))
          .sort((a, b) => a.stepNumber - b.stepNumber)
      );

      const dosageSnap = await getDocs(
        collection(db, "products", productId, "dosage")
      );
      setDosage(
        dosageSnap.docs.map((d) => ({ id: d.id, ...d.data() } as Dosage))
      );

      const safetySnap = await getDocs(
        collection(db, "products", productId, "safety")
      );
      setSafety(
        safetySnap.docs.map((d) => ({ id: d.id, ...d.data() } as Safety))
      );

      const visualSnap = await getDocs(
        collection(db, "products", productId, "visualGuide")
      );
      setVisualGuide(
        visualSnap.docs.map((d) => ({ id: d.id, ...d.data() } as VisualGuide))
      );

      const reviewsSnap = await getDocs(
        collection(db, "products", productId, "reviews")
      );
      setReviews(
        reviewsSnap.docs
          .map((d) => ({ id: d.id, ...d.data() } as Review))
          .sort((a, b) => b.rating - a.rating)
      );

      setLoading(false);
    };

    fetchProduct();
  }, [productId]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  if (!product)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Product not found
      </div>
    );

  const images = [
    product.mainImage,
    ...(product.images || []),
    ...(visualGuide.map((v) => v.image) || []),
  ].filter(Boolean);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="text-sm mb-6">
          <Link href="/" className="text-green-600 hover:text-green-700">
            Home
          </Link>
          <span className="mx-2 text-green-600">/</span>
          <Link
            href="/products"
            className="text-green-600 hover:text-green-700"
          >
            Products
          </Link>
          <span className="mx-2 text-green-600">/</span>
          <span className="text-gray-900">{product.name}</span>
        </div>

        <div className="grid grid-cols-2 gap-12 mb-12">
          {/* Left: Image Gallery */}
          <div>
            <div className="w-full rounded-lg mb-4 h-[600px] overflow-hidden">
              <Image
                src={images[selectedImage]}
                alt={product.name}
                width={500}
                height={500}
                className="object-cover h-full w-full"
              />
            </div>
            <div className="flex gap-2">
              {images.slice(0, 4).map((img, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`w-20 h-20 bg-gray-100 rounded cursor-pointer border-2 ${
                    selectedImage === idx
                      ? "border-green-600"
                      : "border-transparent"
                  }`}
                >
                  <Image
                    src={img}
                    alt="thumbnail"
                    width={80}
                    height={80}
                    className="object-cover w-full h-full rounded"
                  />
                </div>
              ))}
              
            </div>

          </div>

          {/* Right: Product Details */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {product.name}
            </h1>
            <p className="text-green-600 mb-6">{product.description}</p>
         
            <p className="text-4xl text-green-600 font-bold mb-3">
              ${selectedPrice || product.price}
            </p>
            <div className="flex items-center gap-2 mb-6">
              <div className={`w-2 h-2 rounded-full ${
                selectedStock > 10 ? 'bg-green-500' : 
                selectedStock > 0 ? 'bg-yellow-500' : 'bg-red-500'
              }`}></div>
              <span className="text-sm font-medium text-gray-700">
                {selectedStock > 0 
                  ? `${selectedStock} units in stock` 
                  : 'Out of stock'
                }
              </span>
            </div>

            {/* Size Options */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Size
                </label>
                <div className="flex gap-3 flex-wrap">
                  {product.sizes.map((sizeOption) => (
                    <button
                      key={sizeOption.size}
                      onClick={() => {
                        setSelectedSize(sizeOption.size);
                        setSelectedPrice(sizeOption.price);
                        setSelectedStock(sizeOption.stockQuantity);
                      }}
                      className={`px-6 py-2 border rounded-lg ${
                        selectedSize === sizeOption.size
                          ? "border-green-600 bg-green-50 text-green-600"
                          : "border-gray-300 text-gray-700"
                      }`}
                    >
                      {sizeOption.size} 
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity, Heart, and Add to Cart */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantity
              </label>
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-gray-300 text-black rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 hover:bg-gray-50"
                  >
                    -
                  </button>
                  <span className="px-6 py-2 border-x border-gray-300">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 hover:bg-gray-50"
                  >
                    +
                  </button>
                </div>
                <button 
                  disabled={selectedStock === 0}
                  className={`flex-1 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 ${
                    selectedStock > 0 
                      ? 'bg-green-400 text-white hover:bg-green-700' 
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <FaShoppingBasket className="w-5 h-5" />
                  {selectedStock > 0 ? 'Add to Cart' : 'Out of Stock'}
                </button>
                <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-red-500 transition-colors">
                  <FaHeart className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Icons/Badges */}
            <div className="flex gap-4 mb-6">
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <FaCertificate className="text-green-600 w-4 h-4" />
                <span>Organic Certified</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <FaShieldAlt className="text-green-600 w-4 h-4" />
                <span>Money-Back Guarantee</span>
              </div>
            </div>

          </div>
        </div>

        {/* Tabs Section */}
        <section className="mb-12">
          {/* Tab Navigation */}
          <div className="border-b border-gray-200 mb-6">
            <div className="flex space-x-8">
              <button
                onClick={() => setActiveTab("description")}
                className={`pb-4 text-sm font-medium ${
                  activeTab === "description"
                    ? "text-green-600 border-b-2 border-green-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Full Description
              </button>
              <button
                onClick={() => setActiveTab("specifications")}
                className={`pb-4 text-sm font-medium ${
                  activeTab === "specifications"
                    ? "text-green-600 border-b-2 border-green-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Specifications
              </button>
              <button
                onClick={() => setActiveTab("usage")}
                className={`pb-4 text-sm font-medium ${
                  activeTab === "usage"
                    ? "text-green-600 border-b-2 border-green-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                How to Use
              </button>
              <button
                onClick={() => setActiveTab("reviews")}
                className={`pb-4 text-sm font-medium ${
                  activeTab === "reviews"
                    ? "text-green-600 border-b-2 border-green-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Reviews
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="min-h-[300px]">
            {activeTab === "description" && (
              <div className="text-gray-700">
                {product.fullDescription ? (
                  <p className="whitespace-pre-line leading-relaxed">
                    {product.fullDescription}
                  </p>
                ) : (
                  <p>No detailed description available for this product.</p>
                )}
              </div>
            )}

            {activeTab === "specifications" && (
              <div>
                {specifications.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-3 px-4 font-medium text-gray-900 bg-gray-50">
                            NUTRIENT
                          </th>
                          <th className="text-left py-3 px-4 font-medium text-gray-900 bg-gray-50">
                            PERCENTAGE
                          </th>
                          <th className="text-left py-3 px-4 font-medium text-gray-900 bg-gray-50">
                            SOURCE
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {specifications.map((spec) => (
                          <tr key={spec.id} className="border-b border-gray-100 last:border-0">
                            <td className="py-3 px-4 text-gray-900">
                              {spec.nutrient}
                            </td>
                            <td className="py-3 px-4 text-gray-700">
                              {spec.percentage}
                            </td>
                            <td className="py-3 px-4 text-gray-700">
                              {spec.source}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-gray-500">
                    No specifications available for this product.
                  </p>
                )}
              </div>
            )}

            {activeTab === "usage" && (
              <div className="bg-white text-gray-900">
                <div className="grid grid-cols-2 gap-8">
                  {/* Application Rates Section */}
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-6">
                      Application Rates
                    </h3>
                    <div className="space-y-4">
                      {dosage.length > 0 ? (
                        dosage.map((d) => (
                          <div key={d.id} className="flex justify-between items-center py-3 border-b border-gray-200 last:border-0">
                            <span className="font-semibold text-gray-900">
                              {d.plantType}
                            </span>
                            <div className="text-right">
                              <div className="text-gray-700">{d.amount}</div>
                              <div className="text-sm text-gray-600">{d.frequency}</div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="space-y-4">
                          <div className="flex justify-between items-center py-3 border-b border-gray-200">
                            <span className="font-medium text-gray-900">Potted Plants</span>
                            <span className="text-gray-700">1-2 tablespoons per gallon of soil</span>
                          </div>
                          <div className="flex justify-between items-center py-3 border-b border-gray-200">
                            <span className="font-medium text-gray-900">Vegetable Gardens</span>
                            <span className="text-gray-700">2-3 lbs per 100 sq ft</span>
                          </div>
                          <div className="flex justify-between items-center py-3 border-b border-gray-200">
                            <span className="font-medium text-gray-900">Trees & Shrubs</span>
                            <span className="text-gray-700">1/4 cup per foot of plant height</span>
                          </div>
                          <div className="flex justify-between items-center py-3">
                            <span className="font-medium text-gray-900">Lawns</span>
                            <span className="text-gray-700">5-10 lbs per 1,000 sq ft</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Vertical Separator */}
                  <div className="relative">
                    <div className="absolute left-0 top-0 bottom-0 w-px bg-gray-300"></div>
                    <div className="pl-8">
                      {/* How to Apply Section */}
                      <h3 className="text-xl font-semibold text-gray-900 mb-6">
                        How to Use
                      </h3>
                      <div className="space-y-4">
                        {usageGuide.length > 0 ? (
                          usageGuide.map((step) => (
                            <div key={step.id} className="flex items-start space-x-4">
                              <div className="shrink-0 w-8 h-8 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-sm font-semibold">
                                {step.stepNumber}
                              </div>
                              <div>
                                <h4 className="font-semibold text-gray-900 mb-1">
                                  {step.title}
                                </h4>
                                <p className="text-gray-700 leading-relaxed">
                                  {step.description}
                                </p>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="space-y-4">
                            <div className="flex items-start space-x-4">
                              <div className="shrink-0 w-8 h-8 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-sm font-semibold">
                                1
                              </div>
                              <div>
                                <h4 className="font-medium text-gray-900 mb-1">
                                  Ensure Soil is Moist
                                </h4>
                                <p className="text-gray-700 leading-relaxed">
                                  Water the area lightly before application to ensure proper nutrient absorption.
                                </p>
                              </div>
                            </div>
                            <div className="flex items-start space-x-4">
                              <div className="shrink-0 w-8 h-8 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-sm font-semibold">
                                2
                              </div>
                              <div>
                                <h4 className="font-medium text-gray-900 mb-1">
                                  Spread Granules Evenly
                                </h4>
                                <p className="text-gray-700 leading-relaxed">
                                  Distribute the fertilizer granules evenly around the base of plants or across the designated area.
                                </p>
                              </div>
                            </div>
                            <div className="flex items-start space-x-4">
                              <div className="shrink-0 w-8 h-8 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-sm font-semibold">
                                3
                              </div>
                              <div>
                                <h4 className="font-medium text-gray-900 mb-1">
                                  Work Into Soil
                                </h4>
                                <p className="text-gray-700 leading-relaxed">
                                  Gently work the granules into the top 2-3 inches of soil using a rake or cultivator.
                                </p>
                              </div>
                            </div>
                            <div className="flex items-start space-x-4">
                              <div className="shrink-0 w-8 h-8 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-sm font-semibold">
                                4
                              </div>
                              <div>
                                <h4 className="font-medium text-gray-900 mb-1">
                                  Water Thoroughly
                                </h4>
                                <p className="text-gray-700 leading-relaxed">
                                  Water the treated area thoroughly to activate the fertilizer and help nutrients reach plant roots.
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Safety Information */}
                {safety.length > 0 && (
                  <div className="mt-8 bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Safety Information
                    </h3>
                    <div className="space-y-3">
                      {safety.map((s) => (
                        <div key={s.id} className="flex items-start space-x-3">
                          <div className="shrink-0 w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                          <div>
                            <h4 className="font-medium text-gray-900 mb-1">
                              {s.title}
                            </h4>
                            <p className="text-gray-700">{s.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === "reviews" && (
              <div>
                {/* Reviews Header */}
                <div className="flex justify-between items-center mb-8">
                  <div className="flex items-center gap-4">
                    <div className="text-4xl font-bold text-gray-900">
                      {reviews.length > 0 
                        ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
                        : "0.0"
                      }
                    </div>
                    <div>
                      <div className="flex items-center gap-1 mb-1">
                        {[1, 2, 3, 4, 5].map((star) => {
                          const avgRating = reviews.length > 0 
                            ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length 
                            : 0;
                          return (
                            <FaStar
                              key={star}
                              className={`w-5 h-5 ${
                                star <= avgRating ? "text-yellow-400" : "text-gray-300"
                              }`}
                            />
                          );
                        })}
                      </div>
                      <p className="text-sm text-gray-600">
                        Based on {reviews.length} review{reviews.length !== 1 ? 's' : ''}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowReviewForm(true)}
                    className="px-6 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
                  >
                    Write a Review
                  </button>
                </div>

                {/* Review Form Modal */}
                {showReviewForm && (
                  <div className="fixed inset-0 bg-white bg-opacity-90 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                      <div className="text-center mb-8">
                        <h3 className="text-3xl font-bold text-black mb-2">Share Your Experience</h3>
                        <p className="text-gray-600">Help others make informed decisions</p>
                      </div>
                      <form onSubmit={async (e) => {
                        e.preventDefault();
                        try {
                          const newReview = {
                            userName: reviewForm.userName,
                            userImage: "/api/placeholder/40/40",
                            rating: reviewForm.rating,
                            reviewText: reviewForm.reviewText,
                            wouldRecommend: reviewForm.wouldRecommend,
                            date: new Date().toLocaleDateString(),
                            verifiedPurchase: false
                          };
                          
                          const docId = `${reviewForm.userName}_${Math.floor(Math.random() * 10000)}`;
                          await setDoc(doc(db, "products", productId, "reviews", docId), newReview);
                          
                          setReviews(prev => [...prev, { id: Date.now().toString(), ...newReview }].sort((a, b) => b.rating - a.rating));
                          setReviewForm({ userName: "", rating: 5, reviewText: "", wouldRecommend: true });
                          setShowReviewForm(false);
                        } catch (error) {
                          console.error("Error adding review:", error);
                        }
                      }}>
                        <div className="mb-6">
                          <label className="block text-sm font-semibold text-black mb-3">
                            Your Name *
                          </label>
                          <input
                            type="text"
                            required
                            value={reviewForm.userName}
                            onChange={(e) => setReviewForm(prev => ({ ...prev, userName: e.target.value }))}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all text-black placeholder-gray-400"
                            placeholder="Enter your full name"
                          />
                        </div>
                        
                        <div className="mb-6">
                          <label className="block text-sm font-semibold text-black mb-3">
                            Overall Rating *
                          </label>
                          <div className="bg-gray-50 rounded-2xl p-6">
                            <div className="flex gap-2 justify-center mb-4">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                  key={star}
                                  type="button"
                                  onClick={() => setReviewForm(prev => ({ ...prev, rating: star }))}
                                  className="p-2 hover:scale-110 transition-transform"
                                >
                                  <FaStar
                                    className={`w-10 h-10 ${
                                      star <= reviewForm.rating ? "text-yellow-400" : "text-gray-300"
                                    } hover:text-yellow-300 transition-colors`}
                                  />
                                </button>
                              ))}
                            </div>
                            <div className="text-center">
                              <span className="text-lg font-semibold text-black">
                                {reviewForm.rating === 1 && "Poor"}
                                {reviewForm.rating === 2 && "Fair"}
                                {reviewForm.rating === 3 && "Good"}
                                {reviewForm.rating === 4 && "Very Good"}
                                {reviewForm.rating === 5 && "Excellent"}
                              </span>
                              <p className="text-sm text-gray-600 mt-1">
                                {reviewForm.rating}/5 stars
                              </p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="mb-6">
                          <label className="block text-sm font-semibold text-black mb-3">
                            Detailed Review *
                          </label>
                          <textarea
                            required
                            rows={6}
                            value={reviewForm.reviewText}
                            onChange={(e) => setReviewForm(prev => ({ ...prev, reviewText: e.target.value }))}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all text-black placeholder-gray-400 resize-none"
                            placeholder="Tell us about your experience with this product. What did you like? How did it perform? Any tips for other customers?"
                          />
                          <div className="text-right mt-2">
                            <span className="text-sm text-gray-500">
                              {reviewForm.reviewText.length}/500 characters
                            </span>
                          </div>
                        </div>
                        
                        <div className="mb-8">
                          <label className="block text-sm font-semibold text-black mb-4">
                            Would you recommend this product?
                          </label>
                          <div className="flex gap-4">
                            <button
                              type="button"
                              onClick={() => setReviewForm(prev => ({ ...prev, wouldRecommend: true }))}
                              className={`flex-1 px-6 py-3 rounded-xl border-2 transition-all font-semibold ${
                                reviewForm.wouldRecommend
                                  ? "bg-green-100 border-green-500 text-green-700"
                                  : "border-gray-300 text-gray-600 hover:border-gray-400"
                              }`}
                            >
                              👍 Yes, I recommend it
                            </button>
                            <button
                              type="button"
                              onClick={() => setReviewForm(prev => ({ ...prev, wouldRecommend: false }))}
                              className={`flex-1 px-6 py-3 rounded-xl border-2 transition-all font-semibold ${
                                !reviewForm.wouldRecommend
                                  ? "bg-red-100 border-red-500 text-red-700"
                                  : "border-gray-300 text-gray-600 hover:border-gray-400"
                              }`}
                            >
                              👎 No, I don&apos;t recommend it
                            </button>
                          </div>
                        </div>
                        
                        <div className="flex gap-4">
                          <button
                            type="button"
                            onClick={() => setShowReviewForm(false)}
                            className="flex-1 px-6 py-3 border-2 border-gray-300 text-black rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all font-semibold"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="flex-1 px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 hover:shadow-lg transition-all font-semibold"
                          >
                            Submit Review
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}

                {/* Reviews List */}
                <div className="space-y-6">
                  {reviews.length > 0 ? (
                    reviews.map((review) => (
                      <div key={review.id} className="border-b border-gray-200 pb-6 last:border-0">
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium text-gray-600">
                              {review.userName.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="font-medium text-gray-900">{review.userName}</span>
                              <span className="text-sm text-gray-500">{review.date}</span>
                            </div>
                            <div className="flex items-center gap-1 mb-2">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <FaStar
                                  key={star}
                                  className={`w-4 h-4 ${
                                    star <= review.rating ? "text-yellow-400" : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                            <p className="text-gray-700 leading-relaxed">{review.reviewText}</p>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-gray-500 mb-4">
                        No reviews yet for this product.
                      </p>
                      <p className="text-sm text-gray-400">
                        Be the first to leave a review!
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
