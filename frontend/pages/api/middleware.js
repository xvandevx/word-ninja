
export default function myMiddleware(req, res, next) {
    const myData = { message: 'Hello from middleware!' };


    console.log('testset')
    req.myData = myData;


    next();
}