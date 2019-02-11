const ProvidePlugin = require('webpack/lib/ProvidePlugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
//     .BundleAnalyzerPlugin;
module.exports = {
    resolve: {
        alias: {
            videojs: 'video.js',
            WaveSurfer: 'wavesurfer.js'
        }
    },
    plugins: [
        new ProvidePlugin({
            videojs: 'video.js/dist/video.cjs.js',
            RecordRTC: 'recordrtc',
            MediaStreamRecorder: ['recordrtc', 'MediaStreamRecorder']
        })
    ]
};