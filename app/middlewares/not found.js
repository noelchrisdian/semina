const notFound = (req, res) => {
    res.status(404).send({ message: `Route doesn't exist` });
}

export { notFound };