let P = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;

const validateUrlYoutube = (video) => {
    if (video.match(P)) {
        return true;
    }
    return false;
}

module.exports = validateUrlYoutube;