# JKLorenzo-02
An object-oriented approach in implementing the http://dtr.msalvio.com/ api.

### Environmental Variables

| Name     	| Description                            	| Default 	| Required 	|
|----------	|----------------------------------------	|---------	|----------	|
| DB_CREDS 	| The mongoDB connection uri string.     	|   N/A   	|   true   	|
|   PORT   	| The port that will be used by the API. 	|   3000  	|   false  	|


### Types

|     Name    	|                                   Structure                                   	|
|:-----------:	|:-----------------------------------------------------------------------------:	|
| StudentData 	| ``` {    id: string;   sessions: SessionData[];   active_log?: LogData; } ``` 	|
| SessionData 	| ``` {   id: string;   description?: string;   logs: LogData[]; } ```          	|
|   LogData   	| ``` {   in: Date;   out?: Date;   hrs?: number; } ```                         	|


### Routes

| Method 	|             Endpoint            	|                            Response Body                           	|      Request Body      	|
|:------:	|:-------------------------------:	|:------------------------------------------------------------------:	|:----------------------:	|
|   GET  	| /api                            	| 'online'                                                           	|           N/A          	|
|   GET  	| /api/students                   	| {  students: StudentData[],   length: number }                     	|           N/A          	|
|   GET  	| /api/students/:id               	| StudentData                                                        	|           N/A          	|
|   GET  	| /api/students/:id/sessions      	| SessionData[]                                                      	|           N/A          	|
|   GET  	| /api/students/:id/sessions/:sid 	| SessionData                                                        	|           N/A          	|
|  POST  	| /api/students/:id               	| StudentData                                                        	|           N/A          	|
|  PATCH 	| /api/students/:id/sessions/:sid 	| StudentData                                                        	| { description: value } 	|
