import "server-only"
import {visit} from "unist-util-visit"

function addClasses() {
    function transformer(tree: any) {
        visit(tree, 'element', (node: any) => {
            if(node.tagName === 'h1') {
                node.properties = node.properties || {}
                node.properties.className = node.properties.className || [];
                node.properties.className.push('text-3xl');                
            }
        })
    }

    return transformer
}

export default addClasses