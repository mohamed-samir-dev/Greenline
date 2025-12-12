import { NextRequest, NextResponse } from 'next/server';
import { StockManager } from '@/lib/firebase/stockManager';

export async function PATCH(
  request: NextRequest,
  { params }: { params: { productId: string } }
) {
  try {
    const { productId } = params;
    const { action, size, quantity = 1 } = await request.json();

    if (!action || !['decrease', 'increase'].includes(action)) {
      return NextResponse.json(
        { error: 'Invalid action. Must be "decrease" or "increase"' },
        { status: 400 }
      );
    }

    if (quantity <= 0) {
      return NextResponse.json(
        { error: 'Quantity must be greater than 0' },
        { status: 400 }
      );
    }

    let success = false;

    if (action === 'decrease') {
      success = await StockManager.decreaseStock(productId, size, quantity);
    } else {
      success = await StockManager.increaseStock(productId, size, quantity);
    }

    if (!success) {
      return NextResponse.json(
        { error: 'Failed to update stock. Item may be out of stock or not found.' },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Stock update error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}