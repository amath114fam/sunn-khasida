const albums = [
  {
    id: 1,
    titre: 'Khassidas - Layli Mubarak',
    artiste: 'Daaray Touba Ensemble',
    genre: 'Khassida',
    cover: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFUCYHhdyPi2n_366W0Gy6bCrNVuwn8snzZ81nxR4xYA&s=10',
    chansons: [
      { id: 101, titre: 'Du\'a de l\'Aube', duree: '3:40', fichier: 'https://daaraykhassida.com/wp-content/uploads/2022/12/Fariha-Kourel-1-HizbutTarqiyyah-Rufisque-Magal-Touba-2022-.mp3' },
      { id: 102, titre: 'Munajat du Crépuscule', duree: '4:45', fichier: 'https://daaraykhassida.com/wp-content/uploads/2022/12/Raditou-kourel-1-Adolescent-HT-Grand-Magal-Touba-18-Safar-2022.mp3' },
      { id: 103, titre: 'Dikr du Mois Sacré', duree: '6:10', fichier: 'https://daaraykhassida.com/wp-content/uploads/2022/12/Toursi-Kourel-1-Rufisque-hizbut-tarqiyyah-Magal-2022.mp3' }
    ]
  },
  {
    id: 2,
    titre: 'Khassidas - Yoonu Jamm',
    artiste: 'Voix de Médina Baye',
    genre: 'Khassida',
    cover: 'https://www.leral.net/photo/art/grande/95458645-66757119.jpg?v=1773922224',
    chansons: [
      { id: 201, titre: 'Tijaniyya Madiha', duree: '4:55', fichier: 'https://daaraykhassida.com/wp-content/uploads/2022/12/Bushra-Lana-Kourel-1-national-Hizbut-Tarqiyyah-Magal-Touba-2022-.mp3' },
      { id: 202, titre: 'Du\'a de l\'Aube', duree: '3:40', fichier: 'https://daaraykhassida.com/wp-content/uploads/2022/12/Fariha-Kourel-1-HizbutTarqiyyah-Rufisque-Magal-Touba-2022-.mp3' }
    ]
  },
  {
    id: 3,
    titre: 'Coran',
    artiste: 'Abdourahma Sudais',
    genre: 'Al-QURAN',
    cover: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8juUX9ur9v4nBiwx445qNWKlnR_9sHieYqm-JVyfI_g&s=10',
    chansons: [
      { id: 301, titre: 'La  Destinee', duree: '5:30', fichier: 'https://server11.mp3quran.net/sds/097.mp3' },
      { id: 302, titre: 'Ya-sin', duree: '7:15', fichier: 'https://server11.mp3quran.net/sds/036.mp3' },
      { id: 303, titre: 'Le jour montant', duree: '4:20', fichier: 'https://server11.mp3quran.net/sds/093.mp3' }
    ]
  }
]

export default albums