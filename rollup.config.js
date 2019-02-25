import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'
import uglify from 'rollup-plugin-uglify'

export default {
    entry: 'src/bootstrap.js',
    format: 'umd',
    moduleName: 'leaflet-simple-map-screenshoter',
    plugins: [
        resolve(),
        babel({
            exclude: 'node_modules/**'
        }),
        uglify({
            compress: {
                /* drop_console: true */
            }
        }),
        commonjs()
    ],
    sourceMap: true,
    dest: 'dist/leaflet-simple-map-screenshoter.js'
}
