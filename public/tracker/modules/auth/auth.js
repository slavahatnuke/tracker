angular
    .module('Tracker')

    .factory('User', function ($resource) {
        return $resource('/api/users/:nested', {}, {update: {method: 'PUT'}});
    })

    .factory('UserService', function ($q, User, Logout) {
        var self = {

            user: null,

            getUser: function () {
                return this.user
            },
            getUsers: function () {
                return User.query();
            },
            load: function () {
                return $q(function (resolve, reject) {
                    self.user = User.get({nested: 'me'}, function () {
                        resolve(self.user);
                    }, function (err) {
                        reject(err);
                    });
                });
            },
            logout: function () {
                return $q(function (resolve, reject) {
                    Logout.save(function () {
                        self.user = null;
                        resolve();
                    }, reject);
                });

            }
        };


        self.load();

        return self;
    })

    .factory('Login', function ($resource) {
        return $resource('/api/login');
    })
    .controller('LoginCtrl', function ($scope, Login, $state, UserService, toaster) {

        $scope.login = function () {

            Login.save({
                username: $scope.userName,
                password: $scope.userPassword
            }, function () {
                UserService.load().then(function () {
                    $state.go('app.tasks');
                });

            }, function (err) {
                toaster.pop({
                    type: 'error',
                    title: 'Please, check your credentials',
                    timeout: 2000,
                });

            })

        }

    })

    .factory('Logout', function ($resource) {
        return $resource('/api/logout');
    })

    .controller('LogoutCtrl', function ($scope, Logout, $state, UserService) {
        UserService.logout().then(function () {
            $state.go('app.login');
        });
    })

    .factory('Register', function ($resource) {
        return $resource('/api/register');
    })

    .controller('RegisterCtrl', function ($scope, Register, $state, UserService) {

        $scope.register = function () {
            Register.save({
                username: $scope.username,
                email: $scope.email,
                password: $scope.password
            }, function () {
                UserService.load().then(function () {
                    $state.go('app.tasks');
                });
            });
        }

    })

    .controller('ProfileCtrl', function ($scope, $state, User, UserService, toaster) {

        $scope.user = UserService.getUser();

        $scope.oldPassword = '';
        $scope.newPassword = '';
        $scope.newPasswordConfirm = '';
        $scope.email = $scope.user.email || '';

        $scope.save = function () {
            $scope.user.firstName = $scope.firstName;
            $scope.user.lastName = $scope.lastName;
            $scope.user.email = $scope.email;

            $scope.user.$update({
                nested: 'me'
            }, function () {

                toaster.pop({
                    title: 'Saved',
                });

            }, function (err) {

                toaster.pop({
                    type: 'error',
                    title: err.statusText,
                });

            });
        };

        $scope.passwordChange = function () {
            if ($scope.newPassword == $scope.newPasswordConfirm && $scope.newPassword !== $scope.oldPassword) {
                $scope.user.oldPassword = $scope.oldPassword;
                $scope.user.newPassword = $scope.newPassword;

                $scope.user.$save({
                    nested: 'changePassword'
                }, function () {

                    toaster.pop({
                        title: 'Saved'
                    });

                }, function () {

                    toaster.pop({
                        type: 'error',
                        title: 'Wrong password'
                    });

                });

            } else {
                toaster.pop({
                    type: 'error',
                    title: 'Mismatch in new password'
                });
            }
        };
    })

    .factory('resetPassword' , function ($resource) {
        return $resource('/api/resetPassword');
    })

    .controller('resetPasswordCtrl', function ($scope, resetPassword, toaster, User, $state, $stateParams) {

        $scope.username = '';
        $scope.email = '';
        $scope.newPassword = '';
        $scope.newPasswordConfirm = '';

        $scope.resetRequest = function () {

            resetPassword.save({
                    username: $scope.username,
                    email: $scope.email
                },
                function () {
                    toaster.pop({
                        title: 'Request was sent'
                    });
            },  function () {
                    toaster.pop({
                        type: 'error',
                        title: 'Check your e-mail or login'
                    });
            })
        };

        $scope.resetAccept = function () {

            if ($scope.newPassword == $scope.newPasswordConfirm) {

                var user = new User;

                user.$save({
                    nested: 'resetPassword',
                    password: $scope.newPassword,
                    token: $stateParams.token
                }, function () {

                    toaster.pop({
                        title: 'Saved'
                    });

                    $state.go('app.login');

                }, function () {

                    toaster.pop({
                        type: 'error',
                        title: 'Wrong password'
                    });

                });

            } else {
                toaster.pop({
                    type: 'error',
                    title: 'Mismatch in new password'
                });
            }
        };



    });