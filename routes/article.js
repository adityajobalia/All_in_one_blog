const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const Article = require('./../models/article')
//const article = require('./../models/article')

router.get('/new', (req,res) => {
    res.render('articles/new', {article: new Article()})
})

router.get('/edit/:id',async(req,res)=>{
    const article = await Article.findById(req.params.id)
    //res.send(article).json
    res.render('articles/edit',{ article: article })
})

router.get('/:slug', async(req,res)=>{
     await Article.findOne({slug: req.params.slug}, (err, article) => {
         res.render('articles/show', { article: article })
     })
    
})

router.delete('/:id', async(req,res) => {
    await Article.findByIdAndDelete(req.params.id)
    res.redirect('/')
})

router.post('/', async (req,res) => {
    let article = new Article({
        title: req.body.title,
        description: req.body.description,
        markdown: req.body.markdown
    })

    try{

        article = await article.save()
        res.redirect(`/articles/${article.slug}`)
    }catch(e){
        console.log(e)
        res.render('articles/new', { article: article })
    }
})

module.exports = router
