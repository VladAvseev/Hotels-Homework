function getSecondsToday() {
    const dateNow = new Date();
    const today = new Date(dateNow.getFullYear(), dateNow.getMonth(), dateNow.getDate());
    const diff = dateNow - today;
    return Math.round(diff / 1000);
}
console.log(getSecondsToday());