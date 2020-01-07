//沙盒
(() => {

let d3tree = function(id, width, height) {
    let canvas = d3.select(id)
                    .append("svg")
                    .attr('width', '100%')
                    .attr('height', 900)
                    .append("g")
                    .attr('transform', "translate(50,50)") 

    function setFixedArr(arry) {
        let menu = {}
        for (let i = 3; i <= arry.length - 1; i++) {
            let arr = [] 
            arr = arry[i]
            if (i == 3) {
                menu = {
                    "name": arr[0],
                    "children": {}
                }
            }
            if (i == 4) {
                menu.children = []
                for (let j = 0; j <= arr.length - 1; j++) {
                    let onechi = {
                        "name": arr[j],
                        "children": {}
                    }
                    menu.children.push(onechi)
                }
            }
        }
        return menu
    }

    let arrt = setFixedArr(arguments) 

    let insertData = function(treeData, newData) {
        let tree = [treeData]
        function each(data) {
            data.forEach(e =>{
                if (e.name == newData[0]) {
                    e.children = []
                    for (let k = 0; k <= newData[1].length - 1; k++) {
                        let chiDx = {
                            "name": newData[1][k],
                            "children": {}
                        }
                        e.children.push(chiDx)
                    }
                    return
                }
                if (e.children.length > 0) {
                    each(e.children, newData)
                }
            });
        }
        each(tree, newData)
    }

    for (let i = 5; i <= arguments.length - 1; i++) {
        insertData(arrt, arguments[i])
    }

    let datalog = arrt 

    let color = d3.scaleOrdinal().range(d3.schemePaired) 

    let tree = d3.tree().size([height, width]) 

    const root = d3.hierarchy(datalog);

    tree(root);

    const nodes = root.descendants() 

    const links = root.links() 

    let zuobiao = canvas.selectAll(".node")
                        .data(nodes).enter()
                        .append("g")
                        .attr('class', "node")
                        .attr('transform', d =>"translate(" + d.y + "," + d.x + ")");

    let dian = zuobiao.append('circle')
                      .attr('r', 7)
                      .attr('fill', (d) => {
                            let xy = d.x + d.y
                            return color(xy)
                        })

    let mingzi = zuobiao.append("text")
                        .text(d =>d.data.name)
                        .attr('font-size', "0.9em")
                        .attr('transform', "translate(10,-10)") 

    let diy = d3.linkHorizontal()
                .x(d =>d.y)
                .y(d =>d.x) 

    let xian = canvas.selectAll(".nodelink")
                     .data(links).enter()
                     .append("path")
                     .attr('class', 'nodelink')
                     .attr('fill', "none").attr('stroke', (d) =>{
                        let soc = d.target.data.name + d.source.data.name
                        return color(soc)
                     })
                     .attr('d', diy)
}

//d3tree(第1个参数为id，第2个参数为高度，第3个参数为宽度，第4个参数为树图的第1列，第5个参数为树图的第2列，其他参数数组中第1个数为父亲节点，
//如第6个参数中的"c"为第2列的c，其他为c的子节点，注意参数必须按照树图的列排序，如第3列的参数数组的参数下标为6，则第4列的参数下标>6")
d3tree("#d3svg12",
1200,
500,
"a",
["b","c"],
["b",["d","e"]],
["c",["f","g","h"]],
["d",["i","j"]],
["i",["k","l"]],
["k",["m","n"]],
["m",["o","p","q","r","s","t"]]
)
                    
})();