export const daysDifference = (date: string) => {
    const diff = new Date(date).getTime() - new Date().getTime();
    return Math.round(diff / (1000 * 3600 * 24));
}