let storedHistory:string[] = JSON.parse(localStorage.getItem('search-history')|| '[]');

export default storedHistory;