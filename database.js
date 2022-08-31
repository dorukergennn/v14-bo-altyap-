const fs = require('fs')

class db {

   constructor(){

   }

  yaz(veri, değer){
    if (!veri) return console.log('Veri Girmediniz')
    if (!değer) return console.log('Değer Girmediniz')

    const dosya = JSON.parse(fs.readFileSync('database.json', 'utf8'))
    dosya[veri] = değer
    return fs.writeFileSync('database.json', JSON.stringify(dosya, null, 2))
   
      /*
    yaz => set
    db.yaz('prefix', '!')
     */
    
}

it(veri, değer) {
  if (!veri) return console.log('Veri Girmediniz')
  if (!değer) return console.log('Değer Girmediniz')

  const dosya = JSON.parse(fs.readFileSync('database.json', 'utf8'))
  if (!dosya[veri]) return console.log('Yazdığınız Veri Bulunamadı')

  if ( typeof dosya[veri] === 'object') {
    dosya[veri].push(değer)

    dosya[veri] = dosya[veri]
  } else {
  const array = [dosya[veri]]
  array.push(değer)

  dosya[veri] = array
  }
 
  return fs.writeFileSync('database.json', JSON.stringify(dosya, null, 2))
        
  /*
    it => push
    db.it('prefix', '!')
  */

}

  bul(veri){
    if (!veri) return console.log('Veri Girmediniz')

    const dosya = JSON.parse(fs.readFileSync('database.json', 'utf8'))
    if (!dosya[veri]) return console.log('Yazdığınız Veri Bulunamadı')
    return dosya[veri]

     /*
    bul => fetch/get
    db.fetch('prefix')
     */

}
 
  kontrol(veri){
    if (!veri) return console.log('Veri Girmediniz')

    const dosya = JSON.parse(fs.readFileSync('database.json', 'utf8'))
    return dosya[veri] ? true : false

     /*
    kontrol => has
    db.kontrol('prefix')
     */

}

  sil(veri){
    if (!veri) return console.log('Veri Girmediniz')

    const dosya = JSON.parse(fs.readFileSync('database.json', 'utf8'))
    if (!dosya[veri]) return console.log('Yazdığınız Veri Bulunamadı')
    delete dosya[veri]
    return fs.writeFileSync('database.json', JSON.stringify(dosya, null, 2))

     /*
    sil => delete
    db.sil('prefix')
     */

}

  yedekle(dosyaAdı){
    if (!dosyaAdı) return console.log('Dosya Adı Girmediniz')

    const dosya = JSON.parse(fs.readFileSync('database.json', 'utf8'))
    return fs.writeFileSync(`${dosyaAdı}.json`, JSON.stringify(dosya, null, 2))
  
   /*
  yedekle => backup
  db.yedekle('veri.js')
   */

}

  topla(veri, değer){
    if (!veri) return console.log('Veri Girmediniz.')
    if (typeof değer !== 'number') return console.log('Değer Olarak Bir Sayı Girmediniz.')
    if (!this.kontrol(veri)) return console.log('Girdiğiniz Veri, Veritabanında Bulunamadı.')
    if (typeof this.bul(veri) !== 'number') return console.log('Sayı Ekleyeceğiniz Değer Bir Sayı Olamalı.')
    
    const dosya = JSON.parse(fs.readFileSync('database.json', 'utf8'))
    dosya[veri] += değer
    return fs.writeFileSync('database.json', JSON.stringify(dosya, null, 2))

    /*
  topla => add
  db.topla('puan', 5)
   */

}

  çıkar(veri, değer){
    if (!veri) return console.log('Veri Girmediniz.')
    if (typeof değer !== 'number') return console.log('Değer Olarak Bir Sayı Girmediniz.')
    if (!this.kontrol(veri)) return console.log('Girdiğiniz Veri, Veritabanında Bulunamadı.')
    if (typeof this.bul(veri) !== 'number') return console.log('Sayı Ekleyeceğiniz Değer Bir Sayı Olamalı.')
    
    const dosya = JSON.parse(fs.readFileSync('database.json', 'utf8'))
    dosya[veri] -= değer
    return fs.writeFileSync('database.json', JSON.stringify(dosya, null, 2))

    /*
  çıkar => substr
  db.çıkar('puan', 5)
   */

}

  sıfırla(){  
    const dosya = JSON.parse(fs.readFileSync('database.json', 'utf8'))
    return fs.writeFileSync('database.json', JSON.stringify({}, null, 2))

    /*
  sıfırla => -
  db.sıfırla()
   */

}

}

module.exports = new db