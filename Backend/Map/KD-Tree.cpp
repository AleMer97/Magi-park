//
// Created by Sebastian on 20/11/2021.
//

#include "KD-Tree.h"

void TwoDTree::add(Element *element) {
    recursiveAdd(element, root, false);
}

std::vector<Element> TwoDTree::searchRange(double x, double y) {
    return std::vector<Element>();
}

void TwoDTree::recursiveAdd(Element *element, TwoDTree::Node *node, bool dimension) {
    if(node->element == nullptr){
        node->leftChild = new Node();
        node->rightChild = new Node();
        node->element = element;
        return;
    }

    if(dimension){
        if(element->getX() < node->element->getX()){
            recursiveAdd(element, node->leftChild, !dimension);
        }else{
            recursiveAdd(element, node->rightChild, !dimension);
        }
    }else{
        if(element->getY() < node->element->getY()){
            recursiveAdd(element, node->leftChild, !dimension);
        }else{
            recursiveAdd(element, node->rightChild, !dimension);
        }
    }
}

TwoDTree::TwoDTree() {
    root = new Node();
}

TwoDTree::~TwoDTree() {
    recursiveDeleteAll(root);
}

bool TwoDTree::recursiveDelete(Element* element, Node* node, bool dimension) {
    if(node->element == nullptr){
        return false;
    }
    if(node->element == element){
        return true;
    }

    if(dimension){
        if(element->getX() < node->element->getX()){
            return recursiveDelete(element, node->leftChild, !dimension);
        }else{
            return recursiveDelete(element, node->rightChild, !dimension);
        }
    }else{
        if(element->getY() < node->element->getY()){
            return recursiveDelete(element, node->leftChild, !dimension);
        }else{
            return recursiveDelete(element, node->rightChild, !dimension);
        }
    }
}

void TwoDTree::recursiveDeleteAll(Node* node) {
    if(node->leftChild != nullptr) {
        recursiveDeleteAll(node->leftChild);
    }
    if(node->rightChild != nullptr) {
        recursiveDeleteAll(node->rightChild);
    }

    delete node;
}

bool TwoDTree::remove(Element *element) {
    return recursiveDelete(element, root, false);
}
