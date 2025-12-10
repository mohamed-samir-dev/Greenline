# Product Management System - Complete Guide

## 📋 Overview

This system separates product creation into TWO distinct phases:

1. **Main Product Creation** - Creates the core product document
2. **Product Details Management** - Adds sub-collection data (specifications, usage, dosage, etc.)

---

## 🗂️ Firestore Structure

### Main Product Document
**Path:** `products/{productId}`

```json
{
  "name": "",
  "price": 0,
  "category": "",
  "stockQuantity": 0,
  "inStock": false,
  "mainImage": "",
  "images": [],
  "description": "",
  "tags": [],
  "createdAt": "",
  "updatedAt": ""
}
```

### Sub-Collections

#### 1. Specifications
**Path:** `products/{productId}/specifications/{specId}`
```json
{
  "nutrient": "",
  "percentage": "",
  "source": ""
}
```

#### 2. Usage Guide
**Path:** `products/{productId}/usageGuide/{stepId}`
```json
{
  "stepNumber": 0,
  "title": "",
  "description": ""
}
```

#### 3. Dosage
**Path:** `products/{productId}/dosage/{dosageId}`
```json
{
  "plantType": "",
  "amount": "",
  "frequency": ""
}
```

#### 4. Safety
**Path:** `products/{productId}/safety/{safetyId}`
```json
{
  "title": "",
  "description": ""
}
```

#### 5. Visual Guide
**Path:** `products/{productId}/visualGuide/{visualId}`
```json
{
  "image": "",
  "caption": ""
}
```

#### 6. Reviews (Future Use)
**Path:** `products/{productId}/reviews/{reviewId}`
```json
{
  "userName": "",
  "userImage": "",
  "rating": 0,
  "reviewText": "",
  "date": "",
  "verifiedPurchase": false
}
```

#### 7. Rating Summary (Future Use)
**Path:** `products/{productId}/ratingSummary`
```json
{
  "averageRating": 0,
  "totalReviews": 0,
  "ratingBreakdown": {
    "1": 0,
    "2": 0,
    "3": 0,
    "4": 0,
    "5": 0
  }
}
```

---

## 🎯 Admin Workflow

### Step 1: Create Main Product
**Route:** `/admin/add-product`

**Form Fields:**
- Product Name (required)
- Price (required)
- Category (required)
- Stock Quantity (required)
- Main Image URL (required)
- Additional Images (optional, comma-separated)
- Description (required)
- Tags (optional, comma-separated)

**Auto-Generated:**
- `createdAt` - Current timestamp
- `updatedAt` - Current timestamp
- `inStock` - Calculated from stockQuantity

**On Submit:**
- Creates main product document in Firestore
- Redirects to `/admin/products/{productId}/manage`

---

### Step 2: Manage Product Details
**Route:** `/admin/products/{productId}/manage`

**Available Tabs:**

#### Tab 1: Specifications
Add nutrient specifications:
- Nutrient name
- Percentage
- Source

#### Tab 2: Usage Guide
Add step-by-step usage instructions:
- Step number
- Title
- Description

#### Tab 3: Dosage
Add dosage instructions for different plant types:
- Plant type
- Amount
- Frequency

#### Tab 4: Safety
Add safety instructions:
- Title
- Description

#### Tab 5: Visual Guide
Add visual guide images:
- Image URL
- Caption

---

## 📁 File Structure

```
components/admin/
├── add-product/
│   ├── AddProductForm.tsx          # Main form wrapper
│   ├── ProductFormFields.tsx       # Main product fields
│   └── ProductFormActions.tsx      # Submit/Clear buttons
│
└── product-details/
    ├── ProductDetailsManager.tsx   # Tab manager
    ├── SpecificationForm.tsx       # Specifications sub-collection
    ├── UsageGuideForm.tsx          # Usage guide sub-collection
    ├── DosageForm.tsx              # Dosage sub-collection
    ├── SafetyForm.tsx              # Safety sub-collection
    └── VisualGuideForm.tsx         # Visual guide sub-collection

app/admin/
├── add-product/
│   └── page.tsx                    # Main product creation page
│
└── products/[productId]/manage/
    └── page.tsx                    # Product details management page

hooks/
└── useProductForm.ts               # Main product form logic

types/
└── product.ts                      # All TypeScript interfaces
```

---

## 🔑 Key Rules

1. ✅ Main product form creates ONLY the main document
2. ✅ Sub-collections are managed AFTER product creation
3. ✅ No sub-collection fields in the main form
4. ✅ All timestamps auto-generate
5. ✅ Images and tags accept comma-separated values
6. ✅ Stock status (inStock) auto-calculates

---

## 🚀 Usage Example

### Creating a Product:

1. Navigate to `/admin/add-product`
2. Fill in main product details
3. Click "Add Product"
4. System redirects to `/admin/products/{productId}/manage`
5. Add specifications, usage guide, dosage, safety, and visual guides as needed

### Managing Existing Product:

1. Navigate to `/admin/products/{productId}/manage`
2. Select appropriate tab
3. Fill in form fields
4. Submit to add to sub-collection
5. Repeat for multiple entries

---

## 📝 Notes

- All forms validate required fields
- Toast notifications confirm success/failure
- Forms clear after successful submission
- Sub-collections can have multiple documents
- Reviews and rating summary are prepared for future implementation
