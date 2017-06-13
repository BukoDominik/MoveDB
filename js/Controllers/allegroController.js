(function(){
    /*
     * Tworzymy kontroller dla naszego modulu
     */
     angular
     .module("allegroProject")
     .controller("allegroController", allegroCtrl);
     


     function allegroCtrl($http, $timeout, $scope){
        var vm = this;
         var number = Math.floor(Math.random()*5)+1;

        vm.titles ;
        vm.order = '-release_date';
        vm.orderMovies = orderMovies;
        vm.wyniki = 0;
        vm.userAllegro = userAllegro;
        vm.getMovies = getMovies;
        vm.activeMovie ; 
        vm.changeActive = changeActive; 

        vm.slides = [
            {image: 'images/img00.jpg', description: 'Image 00'},
            {image: 'images/img01.jpg', description: 'Image 01'},
            {image: 'images/img02.jpg', description: 'Image 02'},
            {image: 'images/img03.jpg', description: 'Image 03'},
            {image: 'images/img04.jpg', description: 'Image 04'}
        ];
            vm.mov= 0;
           vm.currentIndex = 0;
    vm.setCurrentSlideIndex = function (index) {
        vm.currentIndex = index;
        vm.mov = index;
    };
    vm.isCurrentSlideIndex = function (index) {
        return vm.currentIndex === index;
    };

    vm.startSlider = function (num) {
        vm.num = num;
        vm.num++; 
        if (vm.num>4) {vm.num=0;}
        $timeout(function() {vm.setCurrentSlideIndex(vm.num);}, 5000);
        $timeout(function() {vm.startSlider(vm.num);} ,5000);
    };





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