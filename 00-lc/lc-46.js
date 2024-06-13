var permute = function (nums) {
    let res = []

    var backtrack = function (start) {
        if (start === nums.length) {
            res.push([...nums])
            return
        }
        for (let i = start; i < nums.length; ++i) {
            [nums[start], nums[i]] = [nums[i], nums[start]]
            backtrack(start + 1); // 不加分号会报错
            [nums[start], nums[i]] = [nums[i], nums[start]]
        }
    }

    backtrack(0)
    return res
}