import axios from "axios"
import Block from "../../Block/Block"

export const getCahinsOfAnotherNodes =  async(nodes:Set<string>) => {
    const nodesChains = []
try {
    if (nodes.size != 0) {
        for(const url of nodes) {
            const response = await axios.get(`${url}/node/getChain`)
            const chain = response.data
            nodesChains.push(chain)
        }
    }

} catch (error) {
    console.log(error)  
}
    return nodesChains as Block[][]
}