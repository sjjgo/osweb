import Styles from '../../osweb/backends/styles'

const styles = new Styles()
const c = styles._convertColorValue.bind(styles)

describe('Styles', () => {

  it('Should convert colors', () => {
    expect(c('green')).toEqual(c('#008000'))
    expect(c(255)).toEqual(c('#ffffff'))
    expect(c('255')).toEqual(c('#ffffff'))
    expect(c('#00FF00')).toEqual(c('#00ff00'))
    expect(c('#00ff00')).toEqual(c('#00ff00'))
    expect(c('#0F0')).toEqual(c('#00ff00'))
    expect(c('#0f0')).toEqual(c('#00ff00'))
    expect(c([0, 255, 0])).toEqual(c('#00ff00'))
    expect(c('rgb(0,255,0)')).toEqual(c('#00ff00'))
    expect(c('rgb( 0 , 255 , 0 )')).toEqual(c('#00ff00'))
    expect(c('rgb(0%,100%,0%)')).toEqual(c('#00ff00'))
    expect(c('rgb( +0.0% , 100% , -0.0% )')).toEqual(c('#00ff00'))
    expect(c('hsl(120,100%,50%)')).toEqual(c('#00ff00'))
    expect(c('hsl( +120.0 , 100% , 50% )')).toEqual(c('#00ff00'))
    expect(c('hsv(120,100%,100%)')).toEqual(c('#00ff00'))
    expect(c('hsv( +120.0 , 100% , 100% )')).toEqual(c('#00ff00'))
    expect(c('lab(70, -127, 65)')).toEqual(c('#00d412'))
    expect(c('lab(37, -91, 34)')).toEqual(c('#007017'))
    expect(c('lab( +41. , 8 , -59.0 )')).toEqual(c('#0063c2'))
  })

})
