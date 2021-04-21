<template>
    <img :src=getCover(imgSrc) />
</template>

<script>
export default {
    props: ['imgSrc'],
    methods: {
        getCover (image) {
            let reg = /^upload/
            if (reg.test(image)) {
                return 'http://localhost:8888/image/' + image
            } else {
                return image
            }
        }
    }
}
</script>
