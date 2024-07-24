var pivotIndex = function (nums) {
    let len = nums.length
    let preSum = new Array(len).fill(0)
    preSum[0] = nums[0]
    for (let i = 1; i < len; ++i) {
        preSum[i] = nums[i] + preSum[i - 1]
    }
    console.log(preSum)
    let left = 0, right = 0
    for (let i = 0; i < len; ++i) {
        left = preSum[i] - nums[i]
        right = preSum[len - 1] - preSum[i]
        console.log(i, left, right)
        if (left === right) {
            return i
        }
    }
    return -1
};

pivotIndex([-1, -1, -1, -1, -1, 0])