(() => {
let canvas = d3.select("#d3svg12")
                .append("svg")
                .attr('width','100%')
                .attr('height',900 )
                .append("g")
                .attr('transform',"translate(50,50)" )
let datalog= {
    "name": "Max",
    "children": [
        {
        "name": "Sylvia",
        "children": [
            {"name": "Cra"},
            {"name": "Rwe"}
        ],
        },
        {"name": "Faker",
        "children": [
            {"name": "Fb",
                     "children": [
                        {"name": "Fb",
                             "children": [
                                {"name": "Min"},
                                {"name": "Lgd"},
                                {"name": "Gm"},
                                {"name": "Td"}
                            ]
                        
                        },
                        {"name": "Skt"},
                        {"name": "Ske"},
                        {"name": "Fw"}
                    ]
            },
            {"name": "Lov"},
            {"name": "Pwe"},
            {"name": "Df"}
        ]
        
        },
        {"name": "Mata",
              "children": [
                                {"name": "Ieb"},
                                {"name": "Qw"},
                                {"name": "Gd"},
                                 {"name": "Bc"},
                                  {"name": "Dc"},
                                   {"name": "Kc"},
                                    {"name": "Lke"},
                                     {"name": "Twe"},
                                      {"name": "Fss"}
                            ]
        },
        {"name": "Uzi"}
    ]
}

let color = d3.scaleOrdinal()
    .range(d3.schemePaired)

let tree = d3.tree()
             .size([500,1200])

const root = d3.hierarchy(datalog);
tree(root);
const nodes = root.descendants()
const links = root.links()

let zuobiao = canvas.selectAll(".node")
                 .data(nodes)
                 .enter()
                    .append("g")
                    .attr('class',"node" )
                    .attr('transform',d=>"translate("+d.y+","+d.x+")");

let dian = zuobiao.append('circle')
                    .attr('r',7 )
                    .attr('fill',(d)=>{
                       let xy = d.x+d.y
                        return color(xy)
                    });
                    
let mingzi = zuobiao.append("text")
                    .text(d=>d.data.name)
                       .attr('font-size',"0.9em" )
                     .attr('transform',"translate(10,-10)" )
                    

let diy =  d3.linkHorizontal()
            .x(d => d.y)
            .y(d => d.x)

let xian = canvas.selectAll(".nodelink")
                 .data(links)
                 .enter()
                    .append("path")
                    .attr('class', 'nodelink')
                    .attr('fill',"none" )
                    .attr('stroke',(d)=>{
                        let soc = d.target.data.name+d.source.data.name
                        return color(soc)} )
                    .attr('d',diy)
 })();