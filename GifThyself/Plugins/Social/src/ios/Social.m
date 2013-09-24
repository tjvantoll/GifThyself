//
//  Social.m
//
//  Cameron Lerch
//  Sponsored by Brightflock: http://brightflock.com
//

#import "Social.h"

@interface Social ()

@end

@implementation Social

- (void)available:(CDVInvokedUrlCommand*)command {

    BOOL avail = false;
    
    if (NSClassFromString(@"UIActivityViewController")) {
        avail = true;
    }
    
    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsInt:avail];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)share:(CDVInvokedUrlCommand*)command {
    
    if (!NSClassFromString(@"UIActivityViewController")) {
        return;
    }
    
    NSArray *arguments = command.arguments;
    
    NSString *text = [arguments objectAtIndex:0];


    NSString *urlString = [arguments objectAtIndex:1];
    NSURL *url = [[NSURL alloc] init];
    
    if (urlString != (id)[NSNull null]) {
        url = [NSURL URLWithString:urlString];
    }
    
    NSString *imageName = [arguments objectAtIndex:2] ?: @"test";
    UIImage *image = [[UIImage alloc] init];
    
    if (imageName != (id)[NSNull null]) {
        image = [UIImage imageNamed:imageName];
    }
   
    NSArray *activityItems = [[NSArray alloc] initWithObjects:text, image, url, nil];
    
    UIActivity *activity = [[UIActivity alloc] init];
    
    NSArray *applicationActivities = [[NSArray alloc] initWithObjects:activity, nil];
    UIActivityViewController *activityVC =
    [[UIActivityViewController alloc] initWithActivityItems:activityItems
                                      applicationActivities:applicationActivities];
    
    [self.viewController presentViewController:activityVC animated:YES completion:nil];
}

@end
