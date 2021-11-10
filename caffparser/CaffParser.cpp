//
// Created by sasa on 2021. 11. 05..
//

#include <iostream>
#include <cstring>
#include <exception>
#include <vector>
#include <string>
#include "CaffParser.h"
CaffParser::CaffParser( std::ifstream &fr) : fr(fr) {
    this->caff = Caff();
}

void CaffParser::parseHeader(){
    int block_id = parseId();
    if (block_id != 1){
        throw std::exception("Block ID cannot be 1");
    }

    unsigned long blocklength = parseEightBytesToInt();

    char magic[5];
    fr.read((char*) magic, 4);
    magic[4] = '\0';
    if(strcmp(magic,"CAFF") != 0){
        throw std::exception("File must have CAFF written in it!");
    }



    unsigned long headerlength = parseEightBytesToInt();

    unsigned long numanims = parseEightBytesToInt();
    caff.setNumberOfAnim(numanims);
}

void CaffParser::parse(){
    parseHeader();
    for(int i=0;i<caff.getNumberOfAnim()+1;i++){
        parseBlock();
    }
    caff.printData();
};
void CaffParser::parseBlock(){
    int id = parseId();
    unsigned long blocklength = parseEightBytesToInt();
    if(id == 2){
        parseCredentials(blocklength);
    }
    if(id == 3){
        parseAnimation(blocklength);
    }

}

void CaffParser::parseCredentials(unsigned long length){
    unsigned char year[2];
    fr.read((char*) year, 2);
    unsigned int yearint =  year[1] << 8 | year[0];

    unsigned char month;
    fr.read((char*) &month, 1);
    unsigned int monthint = (int) month;

    unsigned char day;
    fr.read((char*) &day, 1);
    unsigned int dayint = (int) day;

    unsigned char hour;
    fr.read((char*) &hour, 1);
    unsigned int hourint = (int) hour;

    unsigned char minute;
    fr.read((char*) &minute, 1);
    unsigned int minuteint = (int) minute;

    unsigned int creatorlength = parseEightBytesToInt();
    if(length!=creatorlength+14){
        throw std::exception("Wrong creator length!");
    }
    char creatorname[creatorlength];
    fr.read((char*) creatorname,creatorlength);
    creatorname[creatorlength]='\0';
    caff.setCredits(yearint, monthint, dayint, hourint, minuteint, creatorname);
}

void CaffParser::parseAnimation(unsigned long length){
    unsigned long duration = parseEightBytesToInt();
    char magic[5];
    fr.read((char*) magic, 4);
    magic[4] = '\0';
    if(strcmp(magic,"CIFF") != 0){
        throw std::exception("File must have CIFF written in it!");
    }
    unsigned long headerlength = parseEightBytesToInt();
    unsigned long contentlength = parseEightBytesToInt();
    unsigned long width = parseEightBytesToInt();
    unsigned long height = parseEightBytesToInt();
    unsigned long remainingbytes = headerlength-36;

    if(contentlength != width*height*3){
        throw std::exception("Width times height is not equals to content length!");
    }
    std::string caption;
    if(remainingbytes>0) {

        std::getline(fr, caption, '\n');
        remainingbytes-=caption.length()+1;
    }
    std::vector<std::string> tags;
    while(remainingbytes>0) {
        std::string tag;
        std::getline(fr, tag, '\0');
        if(tag.length()>remainingbytes){
            throw std::exception("Parsing error!");
            break;
        }
        remainingbytes-=tag.length()+1;
        tags.push_back(tag);
    }
    if(length-contentlength != headerlength+8){
        throw std::exception("Parsing error!");
    }
    std::vector<int> pixels;
    int begin = fr.tellg();
    for(int i = 0 ; i<width*height*3;i++){
        unsigned char pixel;
        fr.read((char*) &pixel,1);
        pixels.push_back((int) pixel);
    }
    int end = fr.tellg();
    if(end-begin != contentlength){
        throw std::exception("Parsing error!");
    }

    caff.addCiff(Ciff(duration,width,height, pixels,caption, tags));
}
unsigned long CaffParser::eightbytestoint(char* arr) {
    unsigned long value = static_cast<uint64_t>(arr[0] & 0xFF) |
    static_cast<uint64_t>(arr[1] & 0xFF) << 8 |
    static_cast<uint64_t>(arr[2] & 0xFF) << 16 |
    static_cast<uint64_t>(arr[3] & 0xFF) << 24 |
    static_cast<uint64_t>(arr[4] & 0xFF) << 32 |
    static_cast<uint64_t>(arr[5] & 0xFF) << 40 |
    static_cast<uint64_t>(arr[5] & 0xFF) << 40 |
    static_cast<uint64_t>(arr[6] & 0xFF) << 48 |
    static_cast<uint64_t>(arr[7] & 0xFF) << 56;
    return value;
}

int CaffParser::parseId() {
    unsigned char block_id_char;
    fr.read((char *) &block_id_char, 1);
    int block_id = (int) block_id_char;
    return block_id;
}

unsigned long CaffParser::parseEightBytesToInt(){
    char arr[8];
    fr.read((char*) arr, 8);
    unsigned long value = eightbytestoint(arr);
    return value;
}


