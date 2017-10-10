import db from '../db'

const Model = {
  findAll() {
    return this.collection()
  },

  find(id) {
    return this.collection().find(record => record.id === +id)
  },

  create(attrs) {
    const collection = this.collection()
    const record = this.withPermittedAttrs(attrs, {id: this.collection().length + 1})

    this.setCollection([
      ...collection,
      record
    ]) //create new record at database

    return record
  },

  update(id, attrs) {
    const collection = this.collection()
    const index = collection.findIndex(record => record.id === +id)

    const updatedRecord = this.withPermittedAttrs(attrs, collection[index])

    this.setCollection([
        ...collection.slice(0,index),
        updatedRecord,
        ...collection.slice(index + 1)
    ])

    return updatedRecord
  },

  destroy(id){
    const collection = this.collection()
    const index = collection.findIndex(record => record.id === +id)

    this.setCollection([
      ...collection.slice(0,index),
      ...collection.slice(index+1)
    ])
  },

  withPermittedAttrs(attrs, init ={}) {
    return this.permittedAttrs.reduce(
      (sum, a) => {
        return attrs[a] ? {...sum, [a]: attrs[a]} : sum
      }
    , init)
  },

  collection() {
    return db[this.keyword]
  },

  setCollection(collection) {
    db[this.keyword] = collection
  }
}

export default Model
