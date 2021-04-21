export function getTranslate (str) {
    switch (str) {
        case 'masterpiece':
            return '名著'
        case 'poem':
            return '诗歌'
        case 'prose':
            return '散文'
        case 'story':
            return '小说'
        case 'classical':
            return '古典'
        case 'suspense':
            return '悬疑'
        case 'inferential':
            return '推理'
        case 'history':
            return '历史'
        case 'scienceFiction':
            return '科幻'
        case 'fantasy':
            return '玄幻'
        case 'romantic':
            return '言情'
        case 'supernatural':
            return '仙侠'
        case 'martial':
            return '武侠'
        case 'other':
            return '其他'
        case 'children':
            return '儿童'
        case 'science':
            return '科普'
        default:
            break
    }
}

export function getDate (time) {
    let date = new Date(Number(time))
    let month = date.getMonth() + 1
    return date.getFullYear() + '-' + month + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes().toString().padStart(2, 0)
}
