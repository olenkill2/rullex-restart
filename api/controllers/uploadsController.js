module.exports =
{
    uploadImg: async (req, res) => {
        const file = req.file;
        let response;
        if (file.filename) {
            response = {
                success: 1,
                file: {
                    url: `/uploads/${file.filename}`
                }
            }
        } else {
            response = {
                success: 0
            }
        }

        res.status(200).json(response);
    },
    uploadImgByUrl: async (req, res) => {
        // const file = req.file;
        // let response;
        // if (file.filename) {
        //     response = {
        //         success: 1,
        //         file: {
        //             url: `/uploads/${file.filename}`
        //         }
        //     }
        // } else {
        //     response = {
        //         success: 0
        //     }
        // }

        res.status(200).json({'url': 'asdf'});
    },
    uploadUrl: async (req, res) => {

        res.status(200).json({meta: {url: 'url'}});
    },
}