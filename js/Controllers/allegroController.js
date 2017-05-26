(function(){
    /*
     * Tworzymy kontroller dla naszego modulu
     */
     angular
     .module("allegroProject")
     .controller("allegroController", allegroCtrl);


     function allegroCtrl($http){
        var vm = this;

        vm.titles ;
        vm.order = '-release_date';
        vm.orderMovies = orderMovies;
        vm.wyniki = 0;
        vm.userAllegro = userAllegro;
        vm.getMovies = getMovies;
        vm.activeMovie ; 
        vm.changeActive = changeActive; 


        function userAllegro(){
            vm.user = "allegro";
            vm.getRepos();

        }


        function getMovies(){
            $http.get('https://api.themoviedb.org/3/search/movie?api_key=e5a1519d5698fa84e5d68ffd08f3a883&language=pl&query='+vm.titles).then(function(res){
                vm.data = res.data.results;
                vm.wyniki = 1;
            });
        }
            function orderMovies(){
            vm.order = 'title';
        }

        function changeActive(index){
            // simple function to attach the data of the turtle clicked on to 
            // the active turtle object
            vm.activeMovie = index;
            vm.index = vm.activeMovie.id;
            $http.get('https://api.themoviedb.org/3/movie/'+vm.index+'?api_key=e5a1519d5698fa84e5d68ffd08f3a883&language=pl').then(function(res){
                vm.details = res.data;
                vm.productionCountry = res.data.production_countries;
                vm.genres = res.data.genres;
                vm.productionCompanies = res.data.production_companies;
            });



        }


    }


})();