# api-sevilla-gol v0.0.0



- [Auth](#auth)
	- [Authenticate](#authenticate)
	
- [Centro](#centro)
	- [Create centro](#create-centro)
	- [Delete centro](#delete-centro)
	- [Retrieve centro](#retrieve-centro)
	- [Retrieve centros](#retrieve-centros)
	- [Update centro](#update-centro)
	
- [Foto](#foto)
	- [Create foto](#create-foto)
	- [Delete foto](#delete-foto)
	- [Retrieve foto](#retrieve-foto)
	- [Retrieve fotos](#retrieve-fotos)
	- [Update foto](#update-foto)
	
- [Pista](#pista)
	- [Create pista](#create-pista)
	- [Delete pista](#delete-pista)
	- [Retrieve pista](#retrieve-pista)
	- [Retrieve pistas](#retrieve-pistas)
	- [Update pista](#update-pista)
	
- [Reserva](#reserva)
	- [Create reserva](#create-reserva)
	- [Delete reserva](#delete-reserva)
	- [Retrieve reserva](#retrieve-reserva)
	- [Retrieve reservas](#retrieve-reservas)
	- [Update reserva](#update-reserva)
	
- [User](#user)
	- [Create user](#create-user)
	- [Delete user](#delete-user)
	- [Retrieve current user](#retrieve-current-user)
	- [Retrieve user](#retrieve-user)
	- [Retrieve users](#retrieve-users)
	- [Update password](#update-password)
	- [Update user](#update-user)
	


# Auth

## Authenticate



	POST /auth

### Headers

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Authorization			| String			|  <p>Basic authorization with email and password.</p>							|

### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>Master access_token.</p>							|

# Centro

## Create centro



	POST /centros


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| nombre			| 			|  <p>Centro's nombre.</p>							|
| descripcion			| 			|  <p>Centro's descripcion.</p>							|
| direccion			| 			|  <p>Centro's direccion.</p>							|
| localizacion			| 			|  <p>Centro's localizacion.</p>							|
| imagenes			| 			|  <p>Centro's imagenes.</p>							|

## Delete centro



	DELETE /centros/:id


## Retrieve centro



	GET /centros/:id


## Retrieve centros



	GET /centros


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update centro



	PUT /centros/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| nombre			| 			|  <p>Centro's nombre.</p>							|
| descripcion			| 			|  <p>Centro's descripcion.</p>							|
| direccion			| 			|  <p>Centro's direccion.</p>							|
| localizacion			| 			|  <p>Centro's localizacion.</p>							|
| imagenes			| 			|  <p>Centro's imagenes.</p>							|

# Foto

## Create foto



	POST /fotos


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| imgurLink			| 			|  <p>Foto's imgurLink.</p>							|
| deletehash			| 			|  <p>Foto's deletehash.</p>							|

## Delete foto



	DELETE /fotos/:id


## Retrieve foto



	GET /fotos/:id


## Retrieve fotos



	GET /fotos


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update foto



	PUT /fotos/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| imgurLink			| 			|  <p>Foto's imgurLink.</p>							|
| deletehash			| 			|  <p>Foto's deletehash.</p>							|

# Pista

## Create pista



	POST /pistas


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| nombre			| 			|  <p>Pista's nombre.</p>							|
| cubierta			| 			|  <p>Pista's cubierta.</p>							|
| precio			| 			|  <p>Pista's precio.</p>							|
| idCentro			| 			|  <p>Pista's idCentro.</p>							|

## Delete pista



	DELETE /pistas/:id


## Retrieve pista



	GET /pistas/:id


## Retrieve pistas



	GET /pistas


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update pista



	PUT /pistas/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| nombre			| 			|  <p>Pista's nombre.</p>							|
| cubierta			| 			|  <p>Pista's cubierta.</p>							|
| precio			| 			|  <p>Pista's precio.</p>							|
| idCentro			| 			|  <p>Pista's idCentro.</p>							|

# Reserva

## Create reserva



	POST /reservas


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| fecha			| 			|  <p>Reserva's fecha.</p>							|
| idUsuario			| 			|  <p>Reserva's idUsuario.</p>							|
| idPista			| 			|  <p>Reserva's idPista.</p>							|

## Delete reserva



	DELETE /reservas/:id


## Retrieve reserva



	GET /reservas/:id


## Retrieve reservas



	GET /reservas


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update reserva



	PUT /reservas/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| fecha			| 			|  <p>Reserva's fecha.</p>							|
| idUsuario			| 			|  <p>Reserva's idUsuario.</p>							|
| idPista			| 			|  <p>Reserva's idPista.</p>							|

# User

## Create user



	POST /users


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>Master access_token.</p>							|
| email			| String			|  <p>User's email.</p>							|
| password			| String			|  <p>User's password.</p>							|
| name			| String			| **optional** <p>User's name.</p>							|
| picture			| String			| **optional** <p>User's picture.</p>							|
| role			| String			| **optional** <p>User's role.</p>							|

## Delete user



	DELETE /users/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>User access_token.</p>							|

## Retrieve current user



	GET /users/me


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>User access_token.</p>							|

## Retrieve user



	GET /users/:id


## Retrieve users



	GET /users


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>User access_token.</p>							|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update password



	PUT /users/:id/password

### Headers

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Authorization			| String			|  <p>Basic authorization with email and password.</p>							|

### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| password			| String			|  <p>User's new password.</p>							|

## Update user



	PUT /users/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>User access_token.</p>							|
| name			| String			| **optional** <p>User's name.</p>							|
| picture			| String			| **optional** <p>User's picture.</p>							|


