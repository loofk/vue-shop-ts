/**
 * 邻接矩阵无向图，适用于迷宫、简单地图、表单级联
 * @author l00465606
 */
class Adjoin {
  // 构成矩阵的原始数据
  protected vertex: string[]
  private quantity: number
  private adjoinArray: number[]

  constructor (vertex: Array<string>) {
    this.vertex = vertex
    this.quantity = vertex.length
    this.adjoinArray = Array.from({ length: this.quantity * this.quantity }, () => 0)
  }

  // 获取某个顶点所在列
  getVertexRow (id: string): number[] {
    const index = this.vertex.indexOf(id)
    const col: number[] = []
    this.vertex.forEach((item, pIndex) => {
      col.push(this.adjoinArray[index + this.quantity * pIndex])
    })
    return col
  }

  // 获取某个顶点的邻接点
  getAdjoinVertexs (id: string): string[] {
    return this.getVertexRow(id)
      .map((item, index) => (item ? this.vertex[index] : ''))
      .filter(Boolean)
  }

  // 设置某个顶点的邻接点
  setAdjoinVertexs (id: string, sides: string[]): void {
    const index = this.vertex.indexOf(id)
    sides.forEach(item => {
      const pIndex = this.vertex.indexOf(item)
      this.adjoinArray[index + this.quantity * pIndex] = 1
    })
  }

  // 获取多个顶点所在列的合并数组
  getRowTotal (params: Array<string>): number[] {
    const multiRows = params.map(id => this.getVertexRow(id))
    const adjoinNames: number[] = []
    this.vertex.forEach((item, index) => {
      const rowTotal = multiRows
        .map(value => value[index])
        .reduce((total, current) => {
          total += current || 0
          return total
        }, 0)

      adjoinNames.push(rowTotal)
    })

    return adjoinNames
  }

  // 求多列邻接点的交集
  getUnions (params: string[]): string[] {
    return this.getRowTotal(params)
      .map((item, index) => item >= params.length ? this.vertex[index] : '')
      .filter(Boolean)
  }

  // 求多列邻接点的并集
  getCollection (params: string[]): string[] {
    return this.getRowTotal(params)
      .map((item, index) => item ? this.vertex[index] : '')
      .filter(Boolean)
  }
}

export default Adjoin
