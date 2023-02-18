function getSecondsToTomorrow() {
    const dateNow = new Date();
    const tomorrow = new Date(dateNow.getFullYear(), dateNow.getMonth(), dateNow.getDate()+1);
    const diff = tomorrow - dateNow;
    return Math.round(diff / 1000);
}
console.log(getSecondsToTomorrow());