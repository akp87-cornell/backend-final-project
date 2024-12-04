type Props = {
    minLimit?: number;
    maxLimit: number;

    page: number;
    setPage: (page: number) => void;
};

const Paginator = (props: Props) => {
    const { minLimit, maxLimit, page, setPage } = {
        ...props,
        minLimit: props.minLimit ?? 1,
    };

    const handleIncrement = () => {
        if (page < maxLimit) {
            setPage(page + 1);
        }
    };

    const handleDecrement = () => {
        if (page > minLimit) {
            setPage(page - 1);
        }
    };

    return (
        <div className="paginator-container">
            <button className="paginator-button" data-testid='decrementpage' onClick={handleDecrement}>
            ↓
            </button>
            <h2 data-testid='pagenumber' className='pagenumber'>
                {page}
            </h2>
            <button className="paginator-button" data-testid='incrementpage' onClick={handleIncrement}>
            ↑
            </button>
        </div>
    );
};

export default Paginator;