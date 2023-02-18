function formatDate(date) {
    const diff = new Date() - date;

    if (diff < 1000) {
        return 'прямо сейчас';
    }

    const sec = Math.floor(diff / 1000);
    if (sec < 60) {
        return sec + ' сек. назад';
    }

    const min = Math.floor(diff / 1000 / 60);
    if (min < 60) {
        return min + ' мин. назад';
    }
}