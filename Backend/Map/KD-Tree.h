//
// Created by Sebastian on 20/11/2021.
//

#ifndef MAGIPARK_KD_TREE_H
#define MAGIPARK_KD_TREE_H

#include <vector>

class Element{
public:
    virtual double getX() = 0;
    virtual double getY() = 0;
    virtual bool operator==(Element * other) = 0;
};

class TwoDTree{
private:
    struct Node{
        Element* element = nullptr;
        Node* leftChild = nullptr;
        Node* rightChild = nullptr;
    };

    Node* root;

    void recursiveAdd(Element *element, Node* node, bool dimension);
    bool recursiveDelete(Element* element,Node* node , bool dimension);
    void recursiveDeleteAll(Node* node);

public:
    TwoDTree();
    ~TwoDTree();

    void add(Element *element);
    bool remove(Element *element);
    std::vector<Element> searchRange(double x, double y);
};

#endif //MAGIPARK_KD_TREE_H
