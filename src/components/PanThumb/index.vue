<template>
    <div :style="{zIndex:zIndex,height:height,width:width}" class="pan-item">
        <div class="pan-info">
            <div class="pan-info-roles-container">
                <slot />
            </div>
        </div>
        <div :style="{backgroundImage: `url(${image})`}" class="pan-thumb"></div>
    </div>
</template>
<script>
export default {
    name: 'PanThumb',
    props: {
        image: {
            type: String,
            required: true
        },
        zIndex: {
            type: Number,
            default: 1
        },
        width: {
            type: String,
            default: '150px'
        },
        height: {
            type: String,
            default: '150px'
        }
    }
}
</script>
<style scoped>
    .pan-item {
        width: 200px;
        height: 200px;
        border-radius: 50%;
        position: relative;
        display: inline-block;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    }
    .pan-info-roles-container {
        padding: 20px;
        height: 100%;
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
    }
    .pan-info {
        position: absolute;
        width: inherit;
        height: inherit;
        overflow: hidden;
        border-radius: 50%;
        box-shadow: inset 0 0 0 5px rgba(0, 0, 0, 0.05);
    }
    .pan-thumb {
        width: 100%;
        height: 100%;
        overflow: hidden;
        position: absolute;
        border-radius: 50%;
        background-size: cover;
        transform-origin: 95% 40%;
        transition: all 0.3s ease-in-out;
        background-position: center center;
    }
    .pan-item:hover .pan-thumb {
        transform: rotate(-150deg);
    }
    .pan-item:hover .pan-info p a {
        opacity: 1;
        transform: translateX(0px) rotate(0deg);
    }
</style>