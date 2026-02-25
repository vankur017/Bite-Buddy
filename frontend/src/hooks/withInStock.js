const withInStock = (WrappedComponent) => {
    return (props) => {
        const { product } = props;
        const isOutOfStock = product?.stock === 0;

        return (
            <WrappedComponent {...props} isOutOfStock={isOutOfStock} />
        );
    };
};

export default withInStock;
