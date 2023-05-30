const verifiedAddress = (text) => {
    return (text && text.length === 42 && text.search('0x') === 0);
}

export default verifiedAddress;