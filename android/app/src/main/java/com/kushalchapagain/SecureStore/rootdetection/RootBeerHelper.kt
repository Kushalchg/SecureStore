package com.kushalchapagain.securestore.rootdetection

import android.content.Context
import com.scottyab.rootbeer.RootBeer
import java.io.File

class RootBeerHelper(private val context: Context) {
    private val rootBeer = RootBeer(context)
    private var lastDetectionMethod = "default"

    fun isDeviceRooted(): Boolean {
        // RootBeer library checks
        if (rootBeer.isRooted() ) {
            lastDetectionMethod = "rootbeer_library"
            return true
        }else{
            lastDetectionMethod = "not_detected"
            return false
        }

    }

    fun getDetectionMethod(): String {
        return lastDetectionMethod
    }

}
