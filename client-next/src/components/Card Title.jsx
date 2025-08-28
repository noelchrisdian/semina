const CardTitle = ({ title, subTitle }) => {
    return (
        <>
            <div className="sub-title mb-1" id="grow-today">
                <span className="text-gradient-pink">
                    {subTitle}
                </span>
            </div>
            <div className="title">{title}</div>
        </>
    )
}

export { CardTitle };