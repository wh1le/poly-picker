# Poly Picker

![CI](https://travis-ci.org/wh1le/poly-picker.svg?branch=master)

React and Rails integration with [Leaflet](https://leafletjs.com/).

![Preview](https://github.com/wh1le/poly-picker/blob/master/docs/screenshot.png)
## Description

This program provides the ability to draw polygons on the map.

## Possible improvements
- [ ] Implement [leaflet-react](https://react-leaflet.js.org/)
- [ ] Implement PostGIS extension for further play
- [ ] Setup Docker
- [ ] Write unit && integrational tests for Front-End

## Instalation
Clone the repository.
```
$ git clone git@github.com:wh1le/poly-picker.git
```
First make sure you have ruby-2.6.5 installed. If you have it
```
$ yarn install
```
```
$ bundle install
```
```
$ rake db:create
```
```
$ rake db:migrate
```
## Usage

Front-End
```
$ ./bin/webpack-dev-server 
```
Back-End
```
$ ./bin/rails
```
## Testing
```
rspec
```

## License
MIT
