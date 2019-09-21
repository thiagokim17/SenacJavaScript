


// Sugestão de etapas da resolução

    // 1. Crie uma função para calcular o preço baseado nos parâmetros da variável "parametros_pesquisa" e solte o 
    // valor no console para testar se está certo.

    // 2. Faça os eventos click e change para os filtros.
    
        // a. Faça o evento click para os filtros do tipo botão (.option-filter). Sempre que houver um click, 
        // remova a classe "selected" dos botões do grupo e depois aplique-a apenas ao que foi clicado para
        // que ele fique azul.

        // b. Faça o evento change para os filtros do tipo <select> e para o <input> de quantidade.

        // c. Sempre que um dos eventos acima ocorrer, atualize a variável "parametros_pesquisa" e rode a função para 
        // calcular o preço

    
    // 3. Altere a função do cálculo do preço. Em vez de soltar os valores no console, atualize as informações
    // nos elementos "result_", atualize o preço no elemento "valor-total" e mude o atributo "src" do elemento 
    // "foto-produto" para alterar a imagem mostrada (todas as imagens estão na pasta img).

    // 4. Adicione a funcionalidade de hide e show do spinner (elemento "refresh-loader") à função de cálculo de preço. 
    // Como não estamos consultando dados externos, o cálculo acaba sendo rápido demais, portanto use um setTimeout 
    // para deixar ele aparecer por pelo menos 2 segundos.

    // 5. Crie a funcionalidade do localStorage e ao carregar a página, consulte o localStorage, 
    // atualize a variável "parametros_pesquisa" e rode a função de cálculo de preço

    let camisetas = {
        'branca' : {
            'gola_v' :{
                'sem_estampa':{
                    'preco_unit': 5.10,
                    'foto':'v-white.jpg'
                },

                'com_estampa':{
                    'preco_unit':8.95,
                    'foto':'v-white-personalized.jpg'
                }
            },

            'gola_normal' :{
                'sem_estampa':{
                    'preco_unit': 4.99,
                    'foto':'normal-white.jpg'
                },

                'com_estampa':{
                    'preco_unit':8.77,
                    'foto':'normal-white-personalized.jpg'
                }
            }
        },

        'colorida' : {
            'gola_v' :{
                'sem_estampa':{
                    'preco_unit': 6.04,
                    'foto':'v-color.jpg'
                },

                'com_estampa':{
                    'preco_unit':9.45,
                    'foto':'v-color-personalized.jpg'
                }
            },

            'gola_normal' :{
                'sem_estampa':{
                    'preco_unit': 5.35,
                    'foto':'normal-color.jpg'
                },

                'com_estampa':{
                    'preco_unit':9.28,
                    'foto':'normal-color-personalized.jpg'
                }
            }
        }
    }

    //parametros de pesquisa
    let parametros_pesquisa = {
        'quantidade': 11,
        'cor':'colorida',
        'gola':'gola_v',
        'qualidade':'q150',
        'estampa':'sem_estampa',
        'embalagem':'unnitaria'
    }


    //Resolução

    $(function(){
        //calculo do preco
        function atualizar_orcamento(parametros){
            $('.refresh-loader').show()
            let quantidade = parametros.quantidade
            let preco_unit = camisetas[parametros.cor][parametros.gola][parametros.estampa].preco_unit
            let foto = camisetas[parametros.cor][parametros.gola][parametros.estampa].foto

            let preco_total = quantidade * preco_unit

            if(parametros.qualidade == 'q190'){
                preco_total *= 1.12
            }

            if(parametros.embalagem = 'unitaria'){
                preco_total += quantidade * 0.15
            }

            if(quantidade >= 1000){
                preco_total *= 0.85
            } else if(quantidade >= 500){
                preco_total *= 0.90
            }else if(quantidade >= 100){
                preco_total *= 0.95
            }

            setTimeout(function(){
                let id_gola = '#' + parametros.gola
                $('#result_gola').html($(id_gola).html())

                let id_estampa = 'option[value = ' + parametros.estampa + ']'
                $('#result_estampa').html ($(id_estampa).html())

                let id_qualidade = '#' + parametros.qualidade
                $('#result_qualidade').html ($(id_qualidade).html())
            
                let id_cor = '#' + parametros.cor
                $('#result_cor').html ($(id_cor).html())

                let id_embalagem = 'option[value = ' + parametros.embalagem + ']'
                $('#result_embalagem').html ($(id_embalagem).html())

                $('#result_quantidade').html(parametros.quantidade)

                $('#valor-total').html(preco_total.toLocaleString('pt-BR', {minimunFractionDigits: 2, maximunFractionDigits: 2} ))

                $('#foto-produto').attr('src', "img/" + foto)

                $('.refresh-loader').hide()
            
            }, 100)

            //console.log(preco_total)
        }

        function atualizar_campos(parametros){
            $('#cor').children().removeClass('selected')
            let id_cor = '#' + parametros.cor
            $('id_cor').addClass('selected')

            $('#gola').children().removeClass('selected')
            let id_gola = '#' + parametros.gola
            $('id_gola').addClass('selected')

            $('#qualidade').children().removeClass('selected')
            let id_qualidade = '#' + parametros.qualidade
            $('id_qualidade').addClass('selected')

            $('#estampa').val(parametros.qualidade)

            $('#embalagem').val(parametros.embalagem)

            $('#quantidade').val(parametros.quantidade)
        }

        $('.option-filter div').click(function(){
            $(this).parent().children('div').removeClass('selected')
            $(this).addClass('selected')
    
            let categoria = $(this).parent().attr('id')
            parametros_pesquisa[categoria] = $(this).attr('id')
            atualizar_orcamento(parametros_pesquisa)

            //selecao embalagem
            $('select').change(function(){
                let parametros_select = $(this).attr('id')
                parametros_pesquisa[parametros_select] = $(this).val()
                atualizar_orcamento(parametros_pesquisa)
            })
    
            //quantidade
            $(quantidade).change(function(){
                let parametros_input = $(this).attr('id')
                parametros_pesquisa[parametros_input] = $(this).val()
                atualizar_orcamento(parametros_pesquisa)
            })
        })

        atualizar_campos(parametros)
        atualizar_orcamento(parametros_pesquisa)
    })

