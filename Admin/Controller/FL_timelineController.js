const BaseController = require("./BaseController");
const FL_timelineModel = require("../Model/FL_timelineModel");
const NewsNMMModel = require("../Model/NewsNMMModel");

class FL_timelineController extends BaseController {
    static async insert(req, res) {
        try {
            const data = req.body;
            const file = req.files;

            const image = await super.uploadFiles(file, "FL");
            const timeline = await FL_timelineModel.insert(data, image);

            if (timeline.result.affectedRows > 0) {
                req.flash("success", "Timeline inserted successfully!");
                return res.status(200).redirect(res.Admin("/timeline"));
            } else {
                req.flash("error", "Failed to insert timeline. No rows were affected.");
                return res.status(200).redirect(res.Admin("/timeline"));
            }
        } catch (error) {
            console.error("Error inserting timeline:", error);
            req.flash("error", "An error occurred while inserting the timeline.");
            return res.status(500).redirect(res.Admin("/timeline"));
        }
    }

    static async fetchAllFeeds(req, res) {
        try {
            const feeds = await FL_timelineModel.fetchAllFeeds();
            const news = await NewsNMMModel.NewsList();
            // return res.status(200).json(news);

            res.render("FreightLoungeViews/Timeline/Timeline", {
                title: "Timeline",
                component_title: "Timeline Feeds",
                icon: "<i class='fas fa-clock'></i>",
                page_title: "Timeline Page",
                feeds,
                news
            });

        } catch (error) {
            console.error("Error fetching feeds:", error);
            return res.status(500).json({
                success: false,
                message: "An error occurred while fetching the feeds.",
                error: error.message
            });
        }
    }

    static async editfeeds(req, res) {
        const feedId = req.params.id;
        const feeds = await FL_timelineModel.fetchAllFeeds();
        // return res.status(200).json({feeds})

        if (feeds) {
            const selectedFeed = feeds.feeds.find(feed => feed.id === parseInt(feedId, 10));

            if (selectedFeed) {
                res.render("FreightLoungeViews/Timeline/EditFeeds", {
                    layout: "layout/layout-model",
                    selectedFeed
                });
            } else {
                res.send('Feed not found');
            }
        } else {
            console.error('Feeds data is not an array!');
            res.send('Error: Feeds data is not available or not an array.');
        }
    }

    static async updatetimeline(req, res) {
        const feedId = req.params.id;
        const data = req.body;

        // return res .status(200).json({feedId,data})

        const result = await FL_timelineModel.updatetimeline(data, feedId);
        // return res .status(200).json({result})

        if (result) {
            req.flash('success', 'Post updated successfully!');
            return res.status(200).redirect(res.Admin('/timeline'));
        } else {
            req.flash('error', 'Error in updating Post');
            return res.status(200).redirect(res.Admin('/timeline'));
        }
    }

    static async commentInsert(req, res) {
        try {
            const data = req.body;

            // return res.status(200).json({data})
          
          
            const timelineComment = await FL_timelineModel.commentInsert(data);

            if (timelineComment.result.affectedRows > 0) {
                req.flash("success", "comment posted!");
                return res.status(200).redirect(res.Admin("/timeline"));
            } else {
                req.flash("error", "Failed to post comment. No rows were affected.");
                return res.status(200).redirect(res.Admin("/timeline"));
            }
        } catch (error) {
            console.error("Error inserting timeline:", error);
            req.flash("error", "An error occurred while inserting the comment.");
            return res.status(500).redirect(res.Admin("/timeline"));
        }
    }

    static async fetchcomment(req, res) {

        try {
            const feedId = req.params.id;

            const feeds = await FL_timelineModel.fetchAllFeeds();
            
            const timelineComment = await FL_timelineModel.fetchComments(feedId);

            // return res.status(200).json({timelineComment});

            
        if (feeds) {
            const selectedFeed = feeds.feeds.find(feed => feed.id === parseInt(feedId, 10));
            // return res.status(200).json({selectedFeed});
            if (selectedFeed) {
                res.render("FreightLoungeViews/Timeline/Comment", {
                    layout: "layout/layout-model",
                    selectedFeed,
                    timelineComment: timelineComment.comments 
                });
            } else {
                res.send('Feed not found');
            }
        } else {
            console.error('Feeds data is not an array!');
           
        }
        } catch (error) {
            console.error("Error inserting timeline:", error);
            req.flash("error", "An error occurred while inserting the comment.");
            return res.status(500).redirect(res.Admin("/timeline"));
        }
    }


    static async DeletePost(req, res) {
        const feedId = req.params.id;
// return res .status(200).json({feedId});
        

        try {
            const result = await FL_timelineModel.DeleteFeeds(feedId);

            // return res.status(200).json({result})

            if (result) {
                req.flash('success', 'Post deleted successfully!');
                return res.status(200).redirect(res.Admin('/timeline'));
            } else {
                req.flash('error', 'Error in deleting Post');
                return res.status(200).redirect(res.Admin('/timeline'));
            }
        } catch (error) {
            req.flash('error', 'Error');
            return res.status(200).redirect(res.Admin('/timeline'));
        }
    }
}


module.exports = FL_timelineController;
