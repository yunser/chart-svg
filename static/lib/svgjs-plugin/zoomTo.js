function getTransform(svgElement) {
  var baseVal = svgElement.transform.baseVal
  if (baseVal.numberOfItems) return baseVal.getItem(0)

  var owner = svgElement.ownerSVGElement || svgElement
  var transform = owner.createSVGTransform()
  svgElement.transform.baseVal.appendItem(transform)

  return transform
}

/**
 * Sets the new scale for an element, as if it was zoomed into `clientX, clientY`
 * point
 */
function zoomTo(svgElement, clientX, clientY, scaleMultiplier) {
  var transform = getTransform(svgElement)
  var parent = svgElement.ownerSVGElement
  var parentCTM = parent.getScreenCTM()
  // we have consistent scale on both X and Y, thus we can use just one attribute:
  var scale = transform.matrix.a * scaleMultiplier

  var x = clientX * parentCTM.a - parentCTM.e
  var y = clientY * parentCTM.a - parentCTM.f

  svgElement.setAttribute(
    'transform', 'matrix(' +
      [
        scale,
        transform.matrix.b,
        transform.matrix.c,
        scale,
        x - scaleMultiplier * (x - transform.matrix.e),
        y - scaleMultiplier * (y - transform.matrix.f)
      ].join(' ') + ')'
  )
}
