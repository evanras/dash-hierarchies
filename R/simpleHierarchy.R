# AUTO GENERATED FILE - DO NOT EDIT

#' @export
simpleHierarchy <- function(id=NULL, className=NULL, colors=NULL, data=NULL, selectedItem=NULL, styles=NULL) {
    
    props <- list(id=id, className=className, colors=colors, data=data, selectedItem=selectedItem, styles=styles)
    if (length(props) > 0) {
        props <- props[!vapply(props, is.null, logical(1))]
    }
    component <- list(
        props = props,
        type = 'SimpleHierarchy',
        namespace = 'dash_hierarchies',
        propNames = c('id', 'className', 'colors', 'data', 'selectedItem', 'styles'),
        package = 'dashHierarchies'
        )

    structure(component, class = c('dash_component', 'list'))
}
