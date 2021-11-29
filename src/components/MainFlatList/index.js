import React from 'react';
import { View, Text, FlatList, RefreshControl } from 'react-native';

const MainFlatList = ({
  data,
  renderItem,
  style,
  contentContainerStyle,
  ListHeaderComponent,
  ListFooterComponent,
  ListEmptyComponent,
  ItemSeparatorComponent,
  onEndReached,
  onEndReachedThreshold,
  numColumns,
  columnWrapperStyle,
  horizontal,
  initialNumToRender,
  maxToRenderPerBatch,
  windowSize,
  updateCellsBatchingPeriod,
  removeClippedSubviews,
  viewabilityConfig,
  legacyImplementation,
  initialScrollIndex,
  stickyHeaderIndices,
  onViewableItemsChanged,
  onRefresh,
  refreshing,
  noDataText,
}) => {
  if (!data || data.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontWeight: 'bold' }}>
          {noDataText || 'No data available'}
        </Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        style={style}
        contentContainerStyle={contentContainerStyle}
        ListHeaderComponent={ListHeaderComponent}
        ListFooterComponent={ListFooterComponent}
        ListEmptyComponent={ListEmptyComponent}
        ItemSeparatorComponent={ItemSeparatorComponent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        onEndReached={onEndReached}
        onEndReachedThreshold={onEndReachedThreshold}
        numColumns={numColumns}
        columnWrapperStyle={columnWrapperStyle}
        horizontal={horizontal}
        initialNumToRender={initialNumToRender}
        maxToRenderPerBatch={maxToRenderPerBatch}
        windowSize={windowSize}
        updateCellsBatchingPeriod={updateCellsBatchingPeriod}
        removeClippedSubviews={removeClippedSubviews}
        viewabilityConfig={viewabilityConfig}
        legacyImplementation={legacyImplementation}
        initialScrollIndex={initialScrollIndex}
        stickyHeaderIndices={stickyHeaderIndices}
        onViewableItemsChanged={onViewableItemsChanged}
      />
    </View>
  );
};

export default MainFlatList;
