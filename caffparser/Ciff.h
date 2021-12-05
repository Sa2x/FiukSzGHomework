//
// Created by sasa on 2021. 11. 09..
//

#ifndef CAFFPARSER_CIFF_H
#define CAFFPARSER_CIFF_H


#include <vector>
#include <iostream>

class Ciff {
private:
    unsigned long width;
    unsigned long height;
    std::vector<int>pixels;
    unsigned long duration;
    std::string caption;
    std::vector<std::string>tags;
public:
    Ciff(unsigned long duration,unsigned long _width, unsigned long _height, std::vector<int> pixels, std::string _caption, std::vector<std::string> _tags) {
        this->duration=duration;
        this->width=_width;
        this->height=_height;
        this->pixels=pixels;
        this->caption=_caption;
        this->tags = _tags;
    }

    void printData() {
        std::cout<<"Duration: "<<duration<<'\n';
        std::cout<<"Width: "<<width<<'\n';
        std::cout<<"Height: "<<height<<'\n';
        std::cout<<"Caption: "<<caption<<'\n';
        std::cout<<"Tags:";
        for(const std::string& tag:tags){
            std::cout<<tag<<" ";
        }
        std::cout<<'\n';
        for(int i = 0; i < height;i++){
            for(int j = 0; j < width; j++){
                std::cout<<'('<<pixels.at(i*j+0)<<','<<pixels.at(i*j+1)<<','<<pixels.at(i*j+2)<<");";
            }
            std::cout<<'\n';
        }
    }
};


#endif //CAFFPARSER_CIFF_H
