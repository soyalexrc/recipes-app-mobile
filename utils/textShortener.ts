const textShortener = (text: string, limit: number) => {
    return text.length >= limit
        ? text.substring(0, limit).concat('...') : text
};

export default textShortener;
