<template>
    <div class="writer">
        <input type="file" @change="submit">
    </div>
</template>

<script>
export default {
    data () {
        return {
        }
    },
    methods: {
        submit (e) {
            let formData = new FormData()
            formData.append('avatar', e.target.files[0])
            console.log(formData.get('avatar'))
            this.axios({
                url: 'http://localhost:3000/uploadAvatar',
                method: 'post',
                headers: { 'content-type': 'multipart-formdata' },
                data: formData
            })
        }
    }
}
</script>

<style lang="less" scoped>
.writer {
    padding-top: 100px;
}
</style>
