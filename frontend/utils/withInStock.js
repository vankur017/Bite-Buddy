import React from "react";

/**
 * withInStock - Higher Order Component
 *
 * Wraps any product card component and renders an "Out of Stock" overlay
 * when the product's availabilityStatus is not "In Stock".
 *
 * Usage:
 *   const StoreCardWithStock = withInStock(StoreCard);
 *   <StoreCardWithStock product={product} />
 *
 * Props forwarded:
 *   - product (required): the dummyjson product object
 *   - isOutOfStock (injected): boolean passed to WrappedComponent so it can disable its "Add to Cart" button
 */
const withInStock = (WrappedComponent) => {
    const WithInStockWrapper = (props) => {
        const { product } = props;
        const isOutOfStock =
            !product || product.availabilityStatus !== "In Stock";

        return (
            <div className="relative">
                <WrappedComponent {...props} isOutOfStock={isOutOfStock} />
                {isOutOfStock && (
                    <div className="absolute inset-0 rounded-2xl bg-gray-900/60 flex flex-col items-center justify-center z-10 pointer-events-none">
                        <span className="bg-red-600 text-white text-sm font-bold px-4 py-1.5 rounded-full shadow-lg tracking-wide uppercase">
                            Out of Stock
                        </span>
                    </div>
                )}
            </div>
        );
    };

    WithInStockWrapper.displayName = `withInStock(${WrappedComponent.displayName || WrappedComponent.name || "Component"
        })`;

    return WithInStockWrapper;
};

export default withInStock;
