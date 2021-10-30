/**
 * @typedef  {{id: number, name: string; nodes: INodeData[]}} INodeData
 */
export class NodeData {
    constructor(id, nodes = []) {
        this.id = id;
        this.name = `Node_${id}`;
        this.nodes = nodes;
    }
}