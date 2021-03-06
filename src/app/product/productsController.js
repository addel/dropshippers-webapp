'use strict';

angular.module('dropshippers')
	.filter('startFrom', function() {
	    return function(input, start) {
	    	console.log('input : ', input, ' start : ', start);
	        start = +start; //parse to int
	        return input.slice(start);
	    }
	});

angular.module('dropshippers')
	.controller('ProductsController',
		['$scope', '$state', '$auth', 'ProductService', 'PropositionService', 'ProfileModel', 'categoryList', 'productList',
		function ($scope, $state, $auth, ProductService, PropositionService, ProfileModel, categoryList, productList) {
				
			console.log('categoryList : ', categoryList);
			
			$scope.categories = categoryList;
			$scope.products = productList.products;
			$scope.pagination = productList.pagination; //{currentPage: 1, firstPage: 1, lastPage: 5, nextPage: 2, nombre_de_page: 5, nombre_de_resultats: 5};
			$scope.search = {
				name: null,
				minPrice: null,
				maxPrice: null,
				categories: null,
				numeroPage: productList.pagination.currentPage,
				maxPerPage: 4
			};
			$scope.user = ProfileModel;
			ProfileModel.loadUser();
			
			// $scope.pagination = {
			// 	currentPage: 0,
			// 	total: 0,
			// 	limitProduct: 3
			// };

			
			$scope.searchProducts = function () {
				ProductService.getProducts(_.omitBy($scope.search, _.isNull || _.isEmpty)).then(function(res) {
					$scope.products = res.products;
					$scope.pagination = res.pagination;
	        		return res;
	      		});
			};

			$scope.$watch('pagination.currentPage', function (file) {
				$scope.search.numeroPage = $scope.pagination.currentPage;
		        $scope.searchProducts();
		    });

			$scope.go = function (productId) {
				$state.go('product.detail', {id: productId});
			};

			/*
			$scope.products = [
			{"product_ref":1,"image":"http://dummyimage.com/226x229.png/dddddd/000000","name":"Konklux","price":215.29,"shopName":"Quatz","shopRef":1,"quantity":326,"categories":[{"name":"Inflammation OTC","id":1},{"name":"Povidone-Iodine Prep Pad","id":2},{"name":"MiraLAX","id":3},{"name":"Exchange Select Sunscreen","id":4},{"name":"Soothing Bath Treatment","id":5}]},
			{"product_ref":2,"image":"http://dummyimage.com/161x177.bmp/cc0000/ffffff","name":"Latlux","price":45.59,"shopName":"Photobug","shopRef":2,"quantity":124,"categories":[{"name":"MDSolarSciences SPF40 Mineral Screen","id":1},{"name":"Ery","id":2},{"name":"Antifungal","id":3},{"name":"Tretinoin","id":4}]},
			{"product_ref":3,"image":"http://dummyimage.com/213x226.jpg/ff4444/ffffff","name":"Stringtough","price":220.9,"shopName":"Skyndu","shopRef":3,"quantity":174,"categories":[{"name":"Poison Ivy","id":1},{"name":"Sennazon","id":2},{"name":"DOCTOR HOYS Arnica Boost","id":3},{"name":"Sleep Aid","id":4},{"name":"Zolpidem Tartrate","id":5}]},
			{"product_ref":4,"image":"http://dummyimage.com/114x115.jpg/dddddd/000000","name":"Aerified","price":530.22,"shopName":"Voomm","shopRef":4,"quantity":695,"categories":[{"name":"Pomegranate Antibacterial Foaming Hand Wash","id":1},{"name":"Ipratropium Bromide","id":2},{"name":"Anti-Itch","id":3},{"name":"HZ Formula","id":4},{"name":"leader ibuprofen cold","id":5}]},
			{"product_ref":5,"image":"http://dummyimage.com/215x121.png/5fa2dd/ffffff","name":"Andalax","price":223.5,"shopName":"Voonte","shopRef":5,"quantity":863,"categories":[{"name":"phentermine hydrochloride","id":1},{"name":"cetirizine hydrochloride","id":2},{"name":"HISTEX-PE","id":3},{"name":"Theophylline","id":4}]},
			{"product_ref":6,"image":"http://dummyimage.com/245x204.bmp/ff4444/ffffff","name":"Zathin","price":435.77,"shopName":"Brainlounge","shopRef":6,"quantity":496,"categories":[{"name":"Hydrocodone Bitartrate and Ibuprofen","id":1}]},
			{"product_ref":7,"image":"http://dummyimage.com/137x145.jpg/ff4444/ffffff","name":"Sub-Ex","price":597.34,"shopName":"Edgeify","shopRef":7,"quantity":27,"categories":[{"name":"Amnesteem","id":1},{"name":"Sodium Bicarbonate","id":2}]},
			{"product_ref":8,"image":"http://dummyimage.com/142x183.jpg/5fa2dd/ffffff","name":"Viva","price":598.79,"shopName":"Twitterbridge","shopRef":8,"quantity":731,"categories":[{"name":"SINEMET","id":1},{"name":"Sumatriptan Succinate","id":2}]},
			{"product_ref":9,"image":"http://dummyimage.com/133x240.png/dddddd/000000","name":"Veribet","price":370.28,"shopName":"Twitterwire","shopRef":9,"quantity":820,"categories":[{"name":"Saline Mist","id":1},{"name":"Metolazone","id":2},{"name":"PREMIER VALUE ADVANCED EYE DROPS","id":3},{"name":"Coralite Antibacterial Natural Oat","id":4}]},
			{"product_ref":10,"image":"http://dummyimage.com/219x131.jpg/dddddd/000000","name":"Pannier","price":511.68,"shopName":"Voonyx","shopRef":10,"quantity":907,"categories":[{"name":"Cephalexin","id":1},{"name":"Theragesic Creme","id":2},{"name":"CVS Fast Acting Baby Teething","id":3},{"name":"Multivitamin with Fluoride","id":4}]},
			{"product_ref":11,"image":"http://dummyimage.com/165x147.png/5fa2dd/ffffff","name":"Temp","price":333.5,"shopName":"Wordpedia","shopRef":11,"quantity":714,"categories":[{"name":"Blistex","id":1}]},
			{"product_ref":12,"image":"http://dummyimage.com/169x196.bmp/cc0000/ffffff","name":"Matsoft","price":589.3,"shopName":"Blognation","shopRef":12,"quantity":18,"categories":[{"name":"Omeprazole","id":1},{"name":"ANTI BACTERIAL HAND SANITIZER","id":2}]},
			{"product_ref":13,"image":"http://dummyimage.com/106x131.png/5fa2dd/ffffff","name":"Konklux","price":588.56,"shopName":"Geba","shopRef":13,"quantity":704,"categories":[{"name":"Black Walnut","id":1},{"name":"Curvularia inequalis","id":2}]},
			{"product_ref":14,"image":"http://dummyimage.com/118x203.png/ff4444/ffffff","name":"Job","price":94.34,"shopName":"Tavu","shopRef":14,"quantity":499,"categories":[{"name":"DOXEPIN HYDROCHLORIDE","id":1},{"name":"HAWAIIAN TROPIC","id":2}]},
			{"product_ref":15,"image":"http://dummyimage.com/148x231.bmp/dddddd/000000","name":"Biodex","price":281.68,"shopName":"Jaxbean","shopRef":15,"quantity":45,"categories":[{"name":"bethanechol chloride","id":1}]},
			{"product_ref":16,"image":"http://dummyimage.com/146x172.jpg/dddddd/000000","name":"Greenlam","price":493.53,"shopName":"Avaveo","shopRef":16,"quantity":277,"categories":[{"name":"FENTANYL","id":1}]},
			{"product_ref":17,"image":"http://dummyimage.com/109x118.jpg/5fa2dd/ffffff","name":"Sonsing","price":355.06,"shopName":"Kanoodle","shopRef":17,"quantity":763,"categories":[{"name":"Alcohol","id":1},{"name":"Prednisone","id":2},{"name":"Nabumetone","id":3}]},
			{"product_ref":18,"image":"http://dummyimage.com/127x184.png/cc0000/ffffff","name":"Overhold","price":86.52,"shopName":"Latz","shopRef":18,"quantity":96,"categories":[{"name":"Lysol","id":1},{"name":"TRITICUM AESTIVUM POLLEN","id":2},{"name":"Motion Sickness Relief","id":3},{"name":"PENTOXIFYLLINE","id":4},{"name":"Potassium Citrate","id":5}]},
			{"product_ref":19,"image":"http://dummyimage.com/238x140.png/5fa2dd/ffffff","name":"Otcom","price":556.06,"shopName":"Meedoo","shopRef":19,"quantity":849,"categories":[{"name":"Purminerals 4-in-1 Mineral Tinted Moisturizer Broad Spectrum SPF 20 (LIGHT)","id":1},{"name":"Petrolatum","id":2},{"name":"StarCap Medical Private Limited","id":3},{"name":"NITRO-BID","id":4},{"name":"Amoxicillin","id":5}]},
			{"product_ref":20,"image":"http://dummyimage.com/140x214.bmp/cc0000/ffffff","name":"Job","price":300.21,"shopName":"Einti","shopRef":20,"quantity":674,"categories":[{"name":"Queen Palm","id":1},{"name":"Bodycology","id":2},{"name":"Loratadine","id":3},{"name":"glycerin, phenylephrine hydrochloride, pramoxine, white petrolatum","id":4}]},
			{"product_ref":21,"image":"http://dummyimage.com/140x229.jpg/ff4444/ffffff","name":"Otcom","price":408.54,"shopName":"Youspan","shopRef":21,"quantity":473,"categories":[{"name":"antacid cherry flavored","id":1},{"name":"Standardized Grass Pollen, Sweet Vernal Grass","id":2},{"name":"Metoprolol Succinate","id":3},{"name":"Secale Quartz","id":4}]},
			{"product_ref":22,"image":"http://dummyimage.com/126x185.bmp/5fa2dd/ffffff","name":"It","price":248.24,"shopName":"Livetube","shopRef":22,"quantity":1000,"categories":[{"name":"Levetiractam","id":1}]},
			{"product_ref":23,"image":"http://dummyimage.com/187x249.jpg/5fa2dd/ffffff","name":"Cookley","price":596.56,"shopName":"Avaveo","shopRef":23,"quantity":268,"categories":[{"name":"Nitrostat","id":1},{"name":"Sertraline","id":2},{"name":"Chlorpropamide","id":3},{"name":"Ramipril","id":4},{"name":"Morgidox","id":5}]},
			{"product_ref":24,"image":"http://dummyimage.com/160x168.bmp/ff4444/ffffff","name":"Zontrax","price":505.06,"shopName":"Realcube","shopRef":24,"quantity":151,"categories":[{"name":"Estradiol Transdermal System","id":1},{"name":"LBel Paris","id":2},{"name":"Ziac","id":3},{"name":"ULMUS AMERICANA POLLEN","id":4},{"name":"NWC21 NATURAL SUN PROTECTOR","id":5}]},
			{"product_ref":25,"image":"http://dummyimage.com/102x167.png/cc0000/ffffff","name":"Bitwolf","price":295.38,"shopName":"Topicblab","shopRef":25,"quantity":791,"categories":[{"name":"Childrens MOTRIN","id":1}]},
			{"product_ref":26,"image":"http://dummyimage.com/166x176.bmp/cc0000/ffffff","name":"Matsoft","price":208.68,"shopName":"Blogtags","shopRef":26,"quantity":366,"categories":[{"name":"Estradiol","id":1},{"name":"Arnica","id":2},{"name":"RUMEX ACETOSELLA POLLEN","id":3},{"name":"Doxazosin","id":4}]},
			{"product_ref":27,"image":"http://dummyimage.com/145x154.png/cc0000/ffffff","name":"Transcof","price":139.43,"shopName":"Photolist","shopRef":27,"quantity":420,"categories":[{"name":"Vitale Sensitive Scalp Daily Scalp Healer","id":1},{"name":"ProHance","id":2},{"name":"Sentry Antibac","id":3}]},
			{"product_ref":28,"image":"http://dummyimage.com/143x168.jpg/ff4444/ffffff","name":"Zaam-Dox","price":235.58,"shopName":"Voomm","shopRef":28,"quantity":997,"categories":[{"name":"Dog Epithelium","id":1},{"name":"Clonidine Hydrochloride","id":2},{"name":"Ropinirole Hydrochloride","id":3},{"name":"Borba Age Defying","id":4},{"name":"Motion Sickness Relief","id":5}]},
			{"product_ref":29,"image":"http://dummyimage.com/131x183.png/dddddd/000000","name":"Biodex","price":44.09,"shopName":"Wikivu","shopRef":29,"quantity":631,"categories":[{"name":"TOPIRAMATE","id":1},{"name":"Childrens Non-Drowsy","id":2},{"name":"Ciprofloxacin","id":3}]},
			{"product_ref":30,"image":"http://dummyimage.com/201x115.png/dddddd/000000","name":"Ventosanzap","price":403.35,"shopName":"Yombu","shopRef":30,"quantity":197,"categories":[{"name":"Anticavity Fluoride Rinse","id":1},{"name":"Oxcarbazepine","id":2},{"name":"Escitalopram Oxalate","id":3}]},
			{"product_ref":31,"image":"http://dummyimage.com/144x168.bmp/ff4444/ffffff","name":"Namfix","price":259.88,"shopName":"Dabtype","shopRef":31,"quantity":899,"categories":[{"name":"Naproxen","id":1},{"name":"Pure Finish Mineral Powder Foundation SPF 20 Pure Finish 1","id":2}]},
			{"product_ref":32,"image":"http://dummyimage.com/123x184.bmp/5fa2dd/ffffff","name":"Konklux","price":46.28,"shopName":"Browsedrive","shopRef":32,"quantity":913,"categories":[{"name":"SEROQUEL","id":1}]},
			{"product_ref":33,"image":"http://dummyimage.com/114x241.jpg/5fa2dd/ffffff","name":"Redhold","price":349.14,"shopName":"Roodel","shopRef":33,"quantity":18,"categories":[{"name":"Effervescent Pain Relief","id":1},{"name":"Dilacor","id":2},{"name":"Cultivated Wheat","id":3},{"name":"Hydrocortisone","id":4},{"name":"ReCreate Foundation","id":5}]},
			{"product_ref":34,"image":"http://dummyimage.com/168x152.bmp/ff4444/ffffff","name":"Transcof","price":467.96,"shopName":"Skiba","shopRef":34,"quantity":829,"categories":[{"name":"health mart ibuprofen","id":1},{"name":"Antibacterial Hand Sanitizer Spray","id":2},{"name":"paroxetine hydrochloride","id":3}]},
			{"product_ref":35,"image":"http://dummyimage.com/162x239.jpg/dddddd/000000","name":"Tin","price":382.22,"shopName":"Mudo","shopRef":35,"quantity":243,"categories":[{"name":"Midazolam","id":1},{"name":"SPF30 SUMMER BLEND SUNSCREEN","id":2},{"name":"Clarithromycin","id":3},{"name":"Lung Large Intestine","id":4}]},
			{"product_ref":36,"image":"http://dummyimage.com/123x249.png/dddddd/000000","name":"Duobam","price":596.4,"shopName":"Voolia","shopRef":36,"quantity":291,"categories":[{"name":"Oxytocin","id":1},{"name":"Hemofil M","id":2},{"name":"Nartussal","id":3}]},
			{"product_ref":37,"image":"http://dummyimage.com/248x115.bmp/ff4444/ffffff","name":"Latlux","price":301.25,"shopName":"Fadeo","shopRef":37,"quantity":428,"categories":[{"name":"DIVALPROEX SODIUM","id":1},{"name":"Rugby Nicotine Polacrilex Gum, Mint Flavor","id":2},{"name":"CD HydraLife BB Creme Enhancing Sunscreen Moisturizer For Immediate Beauty Golden Peach Broad Spectrum SPF 30","id":3},{"name":"Nucynta","id":4}]},
			{"product_ref":38,"image":"http://dummyimage.com/209x173.png/cc0000/ffffff","name":"Matsoft","price":20.93,"shopName":"Kazu","shopRef":38,"quantity":688,"categories":[{"name":"Epsom Salt","id":1},{"name":"Pain Relief PM","id":2},{"name":"cetylpyridinium chloride","id":3}]},
			{"product_ref":39,"image":"http://dummyimage.com/146x224.png/ff4444/ffffff","name":"Tin","price":105.0,"shopName":"Thoughtstorm","shopRef":39,"quantity":713,"categories":[{"name":"Conjunctiva Argentum Special Order","id":1},{"name":"LEADER ORIGINAL FORMULA","id":2}]},
			{"product_ref":40,"image":"http://dummyimage.com/195x243.png/ff4444/ffffff","name":"Tresom","price":120.76,"shopName":"Linkbuzz","shopRef":40,"quantity":59,"categories":[{"name":"Amoxicillin","id":1},{"name":"DEXEDRINE","id":2},{"name":"SPF 50 UVA/UVB","id":3},{"name":"VANCOMYCIN HYDROCHLORIDE","id":4},{"name":"Hydromorphone Hydrochloride","id":5}]},
			{"product_ref":41,"image":"http://dummyimage.com/168x163.jpg/cc0000/ffffff","name":"Asoka","price":222.35,"shopName":"Riffwire","shopRef":41,"quantity":149,"categories":[{"name":"Etodolac","id":1},{"name":"Belli Acne Control Spot Treatment","id":2}]},
			{"product_ref":42,"image":"http://dummyimage.com/237x194.bmp/dddddd/000000","name":"Greenlam","price":457.19,"shopName":"Divanoodle","shopRef":42,"quantity":281,"categories":[{"name":"SHISEIDO ADVANCED HYDRO-LIQUID COMPACT (REFILL)","id":1}]},
			{"product_ref":43,"image":"http://dummyimage.com/223x135.bmp/5fa2dd/ffffff","name":"Vagram","price":445.81,"shopName":"Dabshots","shopRef":43,"quantity":655,"categories":[{"name":"Estazolam","id":1},{"name":"Onfi","id":2},{"name":"CLINIMIX E","id":3},{"name":"The Fresh Market SPF 15 Lip Balm Broad Spectrum Acai Berry","id":4},{"name":"Naratriptan","id":5}]},
			{"product_ref":44,"image":"http://dummyimage.com/250x237.png/5fa2dd/ffffff","name":"Cardify","price":355.73,"shopName":"Vidoo","shopRef":44,"quantity":101,"categories":[{"name":"Passion Drops","id":1},{"name":"Naproxen Sodium","id":2},{"name":"Losartan Potassium and Hydrochlorothiazide","id":3},{"name":"Gripp-Heel","id":4},{"name":"House Fly","id":5}]},
			{"product_ref":45,"image":"http://dummyimage.com/249x250.jpg/5fa2dd/ffffff","name":"It","price":346.98,"shopName":"Avaveo","shopRef":45,"quantity":755,"categories":[{"name":"Monoclate-P","id":1}]},
			{"product_ref":46,"image":"http://dummyimage.com/108x237.bmp/ff4444/ffffff","name":"Tres-Zap","price":399.55,"shopName":"Feedfish","shopRef":46,"quantity":387,"categories":[{"name":"PRAVASTATIN SODIUM","id":1},{"name":"Nasal","id":2},{"name":"foundcealer 2-in-1 foundation and concealer Broad Spectrum SPF 15 Sunscreen","id":3},{"name":"Pain and Fever","id":4},{"name":"LAMICTAL","id":5}]},
			{"product_ref":47,"image":"http://dummyimage.com/164x107.bmp/5fa2dd/ffffff","name":"Prodder","price":189.24,"shopName":"Oyope","shopRef":47,"quantity":515,"categories":[{"name":"Candida albicans","id":1},{"name":"STOOL SOFTENER","id":2},{"name":"Finasteride","id":3}]},
			{"product_ref":48,"image":"http://dummyimage.com/198x115.bmp/ff4444/ffffff","name":"Zoolab","price":377.86,"shopName":"Bubblemix","shopRef":48,"quantity":471,"categories":[{"name":"Lunesta","id":1},{"name":"Naproxen","id":2}]},
			{"product_ref":49,"image":"http://dummyimage.com/234x100.jpg/5fa2dd/ffffff","name":"Y-Solowarm","price":166.86,"shopName":"Riffwire","shopRef":49,"quantity":145,"categories":[{"name":"AMLODIPINE BESYLATE","id":1},{"name":"Ofirmev","id":2},{"name":"Peanut","id":3},{"name":"Zinka Clear Zinc Oxide Sunscreen","id":4},{"name":"Ranitidine Hydrochloride","id":5}]},
			{"product_ref":50,"image":"http://dummyimage.com/143x142.bmp/5fa2dd/ffffff","name":"Zamit","price":419.3,"shopName":"Demizz","shopRef":50,"quantity":971,"categories":[{"name":"Night Time Cherry","id":1}]},
			{"product_ref":51,"image":"http://dummyimage.com/107x168.jpg/cc0000/ffffff","name":"Daltfresh","price":554.66,"shopName":"Leexo","shopRef":51,"quantity":711,"categories":[{"name":"HYDROCODONE BITARTRATE AND ACETAMINOPHEN","id":1},{"name":"CLE DE PEAU BEAUTE REFINING FLUID FOUNDATION","id":2}]},
			{"product_ref":52,"image":"http://dummyimage.com/163x137.bmp/cc0000/ffffff","name":"Konklab","price":67.47,"shopName":"Shuffletag","shopRef":52,"quantity":909,"categories":[{"name":"Oxygen","id":1},{"name":"Vicks NyQuil","id":2},{"name":"Coricidin HBP Maximum Strength Flu","id":3}]},
			{"product_ref":53,"image":"http://dummyimage.com/200x217.bmp/5fa2dd/ffffff","name":"Mat Lam Tam","price":108.98,"shopName":"Devshare","shopRef":53,"quantity":835,"categories":[{"name":"Smart Sense Pain Relief","id":1},{"name":"RENUTRIV","id":2}]},
			{"product_ref":54,"image":"http://dummyimage.com/163x213.bmp/cc0000/ffffff","name":"Bytecard","price":596.21,"shopName":"Edgeclub","shopRef":54,"quantity":57,"categories":[{"name":"rx act all day pain relief","id":1},{"name":"Phenytoin Sodium","id":2}]},
			{"product_ref":55,"image":"http://dummyimage.com/141x220.bmp/dddddd/000000","name":"Flexidy","price":344.49,"shopName":"Quamba","shopRef":55,"quantity":43,"categories":[{"name":"Black Radiance True Complexion BB Cream SPF 15","id":1},{"name":"DIABETIC DRY SKIN DEFENSE","id":2},{"name":"Ampicillin","id":3}]},
			{"product_ref":56,"image":"http://dummyimage.com/129x240.bmp/cc0000/ffffff","name":"Cardify","price":266.76,"shopName":"Nlounge","shopRef":56,"quantity":642,"categories":[{"name":"VIDEX","id":1},{"name":"flu and severe cold and cough","id":2}]},
			{"product_ref":57,"image":"http://dummyimage.com/182x177.bmp/cc0000/ffffff","name":"Zoolab","price":454.59,"shopName":"Thoughtsphere","shopRef":57,"quantity":210,"categories":[{"name":"Sleep Aid","id":1},{"name":"Yves Saint Laurent Top Secrets All In One BB","id":2},{"name":"Levofloxacin","id":3},{"name":"Minocycline Hydrochloride","id":4},{"name":"equaline daytime cold and flu relief","id":5}]},
			{"product_ref":58,"image":"http://dummyimage.com/192x196.bmp/5fa2dd/ffffff","name":"Sub-Ex","price":95.65,"shopName":"Avavee","shopRef":58,"quantity":127,"categories":[{"name":"aspirin","id":1}]},
			{"product_ref":59,"image":"http://dummyimage.com/176x219.bmp/cc0000/ffffff","name":"Alphazap","price":73.57,"shopName":"Jayo","shopRef":59,"quantity":281,"categories":[{"name":"Alo Therapeutic Massage","id":1}]},
			{"product_ref":60,"image":"http://dummyimage.com/186x175.bmp/cc0000/ffffff","name":"Bamity","price":383.42,"shopName":"Yodoo","shopRef":60,"quantity":520,"categories":[{"name":"eye itch relief","id":1},{"name":"PRAVASTATIN SODIUM","id":2},{"name":"Isodine Copitos","id":3},{"name":"KGS","id":4}]},
			{"product_ref":61,"image":"http://dummyimage.com/187x247.bmp/ff4444/ffffff","name":"Latlux","price":144.81,"shopName":"Yakitri","shopRef":61,"quantity":61,"categories":[{"name":"vanarex hair regrowth treatment","id":1},{"name":"Pleo Nig","id":2},{"name":"DiorSkin Nude 070 Dark Brown","id":3}]},
			{"product_ref":62,"image":"http://dummyimage.com/250x244.png/5fa2dd/ffffff","name":"Mat Lam Tam","price":48.93,"shopName":"Edgeblab","shopRef":62,"quantity":264,"categories":[{"name":"Megestrol Acetate","id":1}]},
			{"product_ref":63,"image":"http://dummyimage.com/126x180.jpg/dddddd/000000","name":"Redhold","price":106.01,"shopName":"Centimia","shopRef":63,"quantity":607,"categories":[{"name":"Western Family Tartar Control","id":1},{"name":"Rivastigmine Tartrate","id":2}]},
			{"product_ref":64,"image":"http://dummyimage.com/145x125.bmp/dddddd/000000","name":"Biodex","price":301.68,"shopName":"Yacero","shopRef":64,"quantity":680,"categories":[{"name":"Testosterone Gel","id":1}]},
			{"product_ref":65,"image":"http://dummyimage.com/243x178.bmp/5fa2dd/ffffff","name":"Zontrax","price":228.29,"shopName":"BlogXS","shopRef":65,"quantity":924,"categories":[{"name":"Loratadine and Pseudoephedrine Sulfate","id":1}]},
			{"product_ref":66,"image":"http://dummyimage.com/212x102.png/cc0000/ffffff","name":"Daltfresh","price":213.42,"shopName":"Kazu","shopRef":66,"quantity":334,"categories":[{"name":"Standardized Cat Hair","id":1},{"name":"Zosyn","id":2},{"name":"Equate Childrens acetaminophen","id":3},{"name":"Tummy Upset","id":4}]},
			{"product_ref":67,"image":"http://dummyimage.com/223x118.bmp/cc0000/ffffff","name":"Sonair","price":562.88,"shopName":"Youbridge","shopRef":67,"quantity":415,"categories":[{"name":"Amoxicillin","id":1},{"name":"Sprayology Acne Tonic","id":2},{"name":"FeverALL Adults","id":3}]},
			{"product_ref":68,"image":"http://dummyimage.com/170x221.bmp/ff4444/ffffff","name":"Redhold","price":130.0,"shopName":"Zoomlounge","shopRef":68,"quantity":877,"categories":[{"name":"HAWAIIAN TROPIC","id":1},{"name":"smart sense mucus er","id":2}]},
			{"product_ref":69,"image":"http://dummyimage.com/158x205.jpg/5fa2dd/ffffff","name":"Sonair","price":217.05,"shopName":"Devpoint","shopRef":69,"quantity":330,"categories":[{"name":"Moisturizing Antibacterial","id":1},{"name":"Torsemide","id":2}]},
			{"product_ref":70,"image":"http://dummyimage.com/224x111.jpg/dddddd/000000","name":"Zathin","price":308.92,"shopName":"Aimbu","shopRef":70,"quantity":55,"categories":[{"name":"Vanilla Sugar Antibacterial Hand Sanitizer","id":1},{"name":"VYTORIN","id":2}]},
			{"product_ref":71,"image":"http://dummyimage.com/148x222.jpg/ff4444/ffffff","name":"Duobam","price":527.3,"shopName":"Devbug","shopRef":71,"quantity":33,"categories":[{"name":"citroma","id":1},{"name":"Midazolam","id":2},{"name":"COBROXIN","id":3},{"name":"Cough and Cold Relief HBP","id":4}]},
			{"product_ref":72,"image":"http://dummyimage.com/122x180.png/ff4444/ffffff","name":"Transcof","price":87.12,"shopName":"Realpoint","shopRef":72,"quantity":67,"categories":[{"name":"Night Time Original","id":1},{"name":"DIPYRIDAMOLE","id":2}]},
			{"product_ref":73,"image":"http://dummyimage.com/119x194.bmp/5fa2dd/ffffff","name":"Konklab","price":298.96,"shopName":"Quatz","shopRef":73,"quantity":755,"categories":[{"name":"La Vaquita","id":1},{"name":"CORYLUS AMERICANA POLLEN","id":2},{"name":"REFRESH P.M.","id":3},{"name":"Oxazepam","id":4}]},
			{"product_ref":74,"image":"http://dummyimage.com/238x109.jpg/dddddd/000000","name":"Lotstring","price":403.31,"shopName":"Yakitri","shopRef":74,"quantity":235,"categories":[{"name":"sleep time","id":1}]},
			{"product_ref":75,"image":"http://dummyimage.com/113x192.bmp/ff4444/ffffff","name":"Asoka","price":388.22,"shopName":"Leexo","shopRef":75,"quantity":529,"categories":[{"name":"Dakins Full","id":1},{"name":"Lisinopril","id":2},{"name":"Larynx Levisticum","id":3},{"name":"SWEATBLOCK","id":4},{"name":"Sun Shades","id":5}]},
			{"product_ref":76,"image":"http://dummyimage.com/236x101.png/ff4444/ffffff","name":"Keylex","price":72.85,"shopName":"Oyoloo","shopRef":76,"quantity":18,"categories":[{"name":"Detox Intestinum","id":1},{"name":"TEETHING","id":2},{"name":"Pramipexole Dihydrochloride","id":3}]},
			{"product_ref":77,"image":"http://dummyimage.com/127x243.bmp/5fa2dd/ffffff","name":"Keylex","price":243.13,"shopName":"Brainbox","shopRef":77,"quantity":778,"categories":[{"name":"No7 Lifting and Firming Foundation Sunscreen SPF 15 Blonde","id":1},{"name":"Dove Ultimate Go Fresh Energizing","id":2},{"name":"Sucrets Herbal","id":3},{"name":"ZITHRANOL-RR","id":4},{"name":"ZERIT","id":5}]},
			{"product_ref":78,"image":"http://dummyimage.com/235x181.jpg/dddddd/000000","name":"Latlux","price":148.48,"shopName":"Miboo","shopRef":78,"quantity":910,"categories":[{"name":"Cefprozil","id":1}]},
			{"product_ref":79,"image":"http://dummyimage.com/182x225.png/5fa2dd/ffffff","name":"Transcof","price":67.7,"shopName":"Kimia","shopRef":79,"quantity":333,"categories":[{"name":"Hydrocodone Polistirex and Chlorpheniramine Polisitrex","id":1},{"name":"ZOLPIDEM TARTRATE","id":2},{"name":"Triple Antibiotic","id":3}]},
			{"product_ref":80,"image":"http://dummyimage.com/222x170.png/cc0000/ffffff","name":"Aerified","price":392.12,"shopName":"Devbug","shopRef":80,"quantity":474,"categories":[{"name":"CY BETTER LIPS BALM Humectante para Labios con color FPS 18","id":1},{"name":"Naropin","id":2},{"name":"Fluocinonide","id":3},{"name":"Peach Mango Anti-Bacterial Hand Sanitizer","id":4}]},
			{"product_ref":81,"image":"http://dummyimage.com/188x235.jpg/dddddd/000000","name":"Domainer","price":228.22,"shopName":"Thoughtworks","shopRef":81,"quantity":447,"categories":[{"name":"No7 Beautifully Matte Foundation Sunscreen Broad Spectrum SPF 15 Mocha","id":1},{"name":"ATOPALM Hemorrhoidal Pain Relieving","id":2}]},
			{"product_ref":82,"image":"http://dummyimage.com/122x160.png/5fa2dd/ffffff","name":"Span","price":285.97,"shopName":"Twinte","shopRef":82,"quantity":152,"categories":[{"name":"Labetalol HCl","id":1},{"name":"Amidate","id":2},{"name":"AcneFree Clear Skin Treatments","id":3}]},
			{"product_ref":83,"image":"http://dummyimage.com/180x196.jpg/dddddd/000000","name":"Subin","price":126.37,"shopName":"Latz","shopRef":83,"quantity":529,"categories":[{"name":"Zicam","id":1}]},
			{"product_ref":84,"image":"http://dummyimage.com/164x205.png/5fa2dd/ffffff","name":"Vagram","price":570.78,"shopName":"Skipstorm","shopRef":84,"quantity":161,"categories":[{"name":"Guinea Pig Epithelium","id":1},{"name":"Venapro","id":2},{"name":"Cetirizine Hydrochloride","id":3}]},
			{"product_ref":85,"image":"http://dummyimage.com/106x122.png/ff4444/ffffff","name":"Alphazap","price":59.45,"shopName":"Skyvu","shopRef":85,"quantity":558,"categories":[{"name":"Morphine Sulfate","id":1}]},
			{"product_ref":86,"image":"http://dummyimage.com/201x192.bmp/5fa2dd/ffffff","name":"Lotstring","price":299.42,"shopName":"Realbuzz","shopRef":86,"quantity":242,"categories":[{"name":"Pravastatin sodium","id":1}]},
			{"product_ref":87,"image":"http://dummyimage.com/134x194.png/ff4444/ffffff","name":"Biodex","price":344.62,"shopName":"Rhynoodle","shopRef":87,"quantity":485,"categories":[{"name":"Hypericum ex herba 3","id":1},{"name":"Sodium Bicarbonate","id":2},{"name":"Ear Care","id":3},{"name":"NHS Headache Flu","id":4},{"name":"Q Tussin DM","id":5}]},
			{"product_ref":88,"image":"http://dummyimage.com/204x126.png/5fa2dd/ffffff","name":"Konklux","price":75.0,"shopName":"Brainlounge","shopRef":88,"quantity":75,"categories":[{"name":"ADSOL Red Cell Preservation Solution System in Plastic Container (PL 146 Plastic)","id":1},{"name":"lisinopril","id":2},{"name":"Pacific","id":3},{"name":"Oxacillin","id":4},{"name":"HYDROCODONE BITARTRATE AND ACETAMINOPHEN","id":5}]},
			{"product_ref":89,"image":"http://dummyimage.com/168x166.png/5fa2dd/ffffff","name":"Keylex","price":172.38,"shopName":"Gabcube","shopRef":89,"quantity":303,"categories":[{"name":"leader nicotine","id":1}]},
			{"product_ref":90,"image":"http://dummyimage.com/189x165.bmp/5fa2dd/ffffff","name":"Prodder","price":61.91,"shopName":"Thoughtbeat","shopRef":90,"quantity":470,"categories":[{"name":"Red Kidney Beans","id":1},{"name":"smashbox","id":2},{"name":"Lamotrigine","id":3},{"name":"Hemorrhoids Relief","id":4}]},
			{"product_ref":91,"image":"http://dummyimage.com/221x100.png/dddddd/000000","name":"Daltfresh","price":484.85,"shopName":"Wordify","shopRef":91,"quantity":434,"categories":[{"name":"DR. IASO VITA WHITE","id":1},{"name":"Minocin","id":2},{"name":"Smelt","id":3},{"name":"Miconazole 3 Combination Pack","id":4}]},
			{"product_ref":92,"image":"http://dummyimage.com/205x222.jpg/cc0000/ffffff","name":"Zontrax","price":555.04,"shopName":"Linklinks","shopRef":92,"quantity":650,"categories":[{"name":"Lovenox","id":1},{"name":"ACNE","id":2}]},
			{"product_ref":93,"image":"http://dummyimage.com/117x100.bmp/5fa2dd/ffffff","name":"Zathin","price":404.15,"shopName":"Skimia","shopRef":93,"quantity":88,"categories":[{"name":"CENTER-AL - ATRIPLEX WRIGHTII POLLEN","id":1},{"name":"Oxybutynin Chloride","id":2},{"name":"AMBROSIA ARTEMISIAEFOLIA","id":3}]},
			{"product_ref":94,"image":"http://dummyimage.com/148x108.png/dddddd/000000","name":"Greenlam","price":430.11,"shopName":"Fivechat","shopRef":94,"quantity":898,"categories":[{"name":"Exelderm","id":1},{"name":"Abridge Cold Sore Treatment","id":2}]},
			{"product_ref":95,"image":"http://dummyimage.com/129x114.png/ff4444/ffffff","name":"Alpha","price":262.42,"shopName":"Fiveclub","shopRef":95,"quantity":769,"categories":[{"name":"Waterless Anti-Bacterial Hand Cleanser","id":1},{"name":"Venlafaxine Hydrochloride","id":2}]},
			{"product_ref":96,"image":"http://dummyimage.com/217x238.jpg/dddddd/000000","name":"Ronstring","price":598.35,"shopName":"LiveZ","shopRef":96,"quantity":203,"categories":[{"name":"Good Sense Hemorrhoidal","id":1},{"name":"FANAPT","id":2}]},
			{"product_ref":97,"image":"http://dummyimage.com/167x197.bmp/5fa2dd/ffffff","name":"Fix San","price":68.61,"shopName":"Aibox","shopRef":97,"quantity":236,"categories":[{"name":"Calamine","id":1},{"name":"Molds, Rusts and Smuts, Botrytis cinerea","id":2}]},
			{"product_ref":98,"image":"http://dummyimage.com/141x114.jpg/5fa2dd/ffffff","name":"Fix San","price":337.14,"shopName":"Digitube","shopRef":98,"quantity":131,"categories":[{"name":"OXYGEN","id":1}]},
			{"product_ref":99,"image":"http://dummyimage.com/103x154.bmp/ff4444/ffffff","name":"Konklux","price":273.82,"shopName":"Browsecat","shopRef":99,"quantity":824,"categories":[{"name":"KROGER SPF 4 TANNING OIL","id":1},{"name":"Niaspan","id":2},{"name":"Antiseptic","id":3},{"name":"Dologen 325","id":4}]
		},
		{"product_ref":100,"image":"http://dummyimage.com/239x108.bmp/cc0000/ffffff","name":"Vagram","price":383.63,"shopName":"Ntag","shopRef":100,"quantity":478,"categories":[{"name":"Allergy Complete Relief","id":1}]}]; 
		*/

	}]);